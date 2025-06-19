import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { wizzardQuestions, Question } from '../../db/wizzard-questions';

import { FeatureToggleService } from '../../services/feature-toggle.service';
import { Subscription } from 'rxjs';
import { ProgressService } from '../../services/progress.service'; // Import ProgressService
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wizzard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './wizzard.component.html',
  styleUrl: './wizzard.component.scss'
})
export class WizzardComponent implements OnInit, OnDestroy {

  questions: Question[] = JSON.parse(JSON.stringify(wizzardQuestions)); // Deep copy to avoid modifying original
  currentStep = 0;
  isWizzardComplete = false;
  score = 0;
  timeLeft: number = 600; // Default 10 minutes, will be adjusted by feature toggle
  timerInterval: any;
  isTimeUp: boolean = false;
  isTimerFeatureEnabled: boolean = true;
  private timerFeatureSubscription!: Subscription;

  isStudyModeEnabled: boolean = false;
  private studyModeSubscription!: Subscription;
  showExtendedDescription: { [key: number]: boolean } = {};
  public expandedSteps: { [key: number]: boolean } = {};

  constructor(
    private featureToggleService: FeatureToggleService,
    private progressService: ProgressService // Inject ProgressService
  ) {}

  ngOnInit(): void {
    this.questions.forEach(q => q.userSelectedAnswerId = null);
    this.timerFeatureSubscription = this.featureToggleService.isTimerEnabled$.subscribe(isEnabled => {
      this.isTimerFeatureEnabled = isEnabled;
      if (this.isTimerFeatureEnabled && !this.isWizzardComplete) {
        this.startTimer();
      } else {
        this.clearTimer();
        this.isTimeUp = false; // Ensure isTimeUp is false if timer is disabled
      }
    });
    // Initial check in case subscription fires after this block
    if (this.isTimerFeatureEnabled && !this.isWizzardComplete) {
        this.startTimer();
    }

    this.studyModeSubscription = this.featureToggleService.isStudyModeEnabled$.subscribe(isEnabled => {
      this.isStudyModeEnabled = isEnabled;
      if (!isEnabled) {
        this.showExtendedDescription = {}; // Hide description if study mode is turned off
      }
    });
    this.expandedSteps[this.currentStep] = true;
  }

  ngOnDestroy(): void {
    this.clearTimer();
    if (this.timerFeatureSubscription) {
      this.timerFeatureSubscription.unsubscribe();
    }
    if (this.studyModeSubscription) {
      this.studyModeSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    if (!this.isTimerFeatureEnabled) {
      this.isTimeUp = false; // Ensure time is not up if feature is disabled
      this.clearTimer();
      return;
    }
    this.timeLeft = 600; // Reset time (e.g., 10 minutes)
    this.isTimeUp = false;
    this.clearTimer(); // Clear any existing timer
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.handleTimeUp();
      }
    }, 1000);
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleTimeUp(): void {
    if (!this.isTimerFeatureEnabled) return; // Don't handle if timer wasn't supposed to be on
    this.clearTimer();
    this.isTimeUp = true;
    if (!this.isWizzardComplete) {
      this.completeWizzard(true); // Pass true for dueToTimeUp
    }
  }

  formatTimeLeft(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  get progressPercentage(): number {
    if (this.isWizzardComplete) {
      return 100;
    }
    return ((this.currentStep) / this.questions.length) * 100;
  }

  selectAnswer(answerId: number, questionIndex: number): void {
    if (this.isWizzardComplete || (this.isTimerFeatureEnabled && this.isTimeUp)) {
      return;
    }
    this.questions[questionIndex].userSelectedAnswerId = answerId;
  }

  nextStep(): void {
    if (this.isWizzardComplete || (this.isTimerFeatureEnabled && this.isTimeUp)) {
      return;
    }
    if (this.questions[this.currentStep].userSelectedAnswerId === null) {
      return; // Don't proceed if no answer is selected
    }
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.expandedSteps[this.currentStep] = true;
    } else {
      this.completeWizzard(false); // Pass false for dueToTimeUp
    }
  }

  previousStep(): void {
    if (this.isWizzardComplete || (this.isTimerFeatureEnabled && this.isTimeUp)) {
      return;
    }
    if (this.currentStep > 0) {
      this.currentStep--;
      this.expandedSteps[this.currentStep] = true;
    }
  }

  completeWizzard(dueToTimeUp: boolean = false): void {
    if (this.isTimerFeatureEnabled && !dueToTimeUp) { // Only clear timer if not already cleared by timeUp event
      this.clearTimer();
    }
    this.isWizzardComplete = true;
    this.calculateScore();

    // Save result using ProgressService
    const resultData = {
      score: this.score,
      totalQuestions: this.questions.length,
      timeUp: dueToTimeUp
    };
    this.progressService.addResult(resultData);
  }

  calculateScore(): void {
    this.score = 0;
    this.questions.forEach(question => {
      const correctAnswer = question.answers.find(answer => answer.isCorrect);
      if (correctAnswer && question.userSelectedAnswerId === correctAnswer.id) {
        this.score++;
      }
    });
  }

  isAnswerSelected(answerId: number, questionIndex: number): boolean {
    const question = this.questions[questionIndex];
    return !!question && question.userSelectedAnswerId === answerId;
  }

  getUserAnswerText(question: Question): string {
    if (question.userSelectedAnswerId === null || question.userSelectedAnswerId === undefined) {
      return 'Not answered';
    }
    const selectedAnswer = question.answers.find(a => a.id === question.userSelectedAnswerId);
    return selectedAnswer ? selectedAnswer.text : 'Not answered';
  }

  resetWizzard(): void {
    this.questions = JSON.parse(JSON.stringify(wizzardQuestions));
    this.currentStep = 0;
    this.isWizzardComplete = false;
    this.score = 0;
    this.isTimeUp = false; 
    this.showExtendedDescription = {}; // Reset description visibility
    // Timer will be restarted via subscription to isTimerEnabled$ in ngOnInit or if already subscribed
    // For direct reset, ensure timer logic is re-evaluated:
    this.isTimerFeatureEnabled = this.featureToggleService.getIsTimerEnabled(); // Re-fetch current setting
    if (this.isTimerFeatureEnabled) {
      this.startTimer();
    } else {
      this.clearTimer();
    }
  }

  getStyleClass(question: Question): any {
    return {
              'correct-answer': question.answers.find(a => a.id === question.userSelectedAnswerId)?.isCorrect, 
              'incorrect-answer': !question.answers.find(a => a.id === question.userSelectedAnswerId)?.isCorrect && question.userSelectedAnswerId !== null,
              'no-answer': question.userSelectedAnswerId === null
            }
  }

  shouldDisplay(question: Question): any {
return !(question.answers.find(a => a.id === question.userSelectedAnswerId)?.isCorrect) && question.userSelectedAnswerId !== null
}

getCorrectAnswer(question: Question): string | undefined {
    return question.answers.find(a => a.isCorrect)?.text
  }

  toggleExtendedDescription(questionIndex: number): void {
    if (this.isStudyModeEnabled) {
      this.showExtendedDescription[questionIndex] = !this.showExtendedDescription[questionIndex];
    }
  }

  setStep(index: number): void {
    if (!this.isWizzardComplete) {
      this.currentStep = index;
      this.toggleStep(index);
    }
  }

  toggleStep(index: number): void {
    this.expandedSteps[index] = !this.expandedSteps[index];
  }
}

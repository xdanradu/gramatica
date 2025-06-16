import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProgressService, TestResult } from '../../services/progress.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-progress-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-analytics.component.html',
  styleUrls: ['./progress-analytics.component.scss'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class ProgressAnalyticsComponent implements OnInit, OnDestroy {
  latestResults: TestResult[] = [];
  private resultsSubscription!: Subscription;

  // Placeholder for chart data
  chartData: any[] = [];
  chartLabels: string[] = [];
  normalizedChartBarHeights: number[] = []; // Added for normalized bar heights
  averageScore: number | null = null; // Added for the average score line

  constructor(
    private progressService: ProgressService,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  ngOnInit(): void {
    this.resultsSubscription = this.progressService.results$
      .pipe(
        map(results => {
          // Sort by date descending (newest first) and take the last 10
          return [...results] // Create a new array to avoid mutating the source
            .sort((a, b) => b.date - a.date)
            .slice(0, 10);
        })
      )
      .subscribe(results => {
        this.latestResults = results;
        this.prepareChartData();
      });
  }

  prepareChartData(): void {
    this.chartLabels = this.latestResults
      .map(r => this.datePipe.transform(r.date, 'MMM d, HH:mm', undefined, 'en-US'))
      .filter((label): label is string => label !== null)
      .reverse(); 

    const scores = this.latestResults
      .map(r => (r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0))
      .reverse();

    this.chartData = [
      {
        data: scores, // Original scores for tooltips and other data needs
        label: 'Score (%)'
      }
    ];

    // Calculate average score
    if (scores.length > 0) {
      const sumOfScores = scores.reduce((acc, curr) => acc + curr, 0);
      this.averageScore = sumOfScores / scores.length;
    } else {
      this.averageScore = null;
    }

    // Normalize scores for bar heights
    if (scores.length > 0) {
      const maxScore = Math.max(...scores);
      if (maxScore > 0) {
        this.normalizedChartBarHeights = scores.map(score => (score / maxScore) * 100);
      } else {
        // All scores are 0, so all normalized heights are 0
        this.normalizedChartBarHeights = scores.map(() => 0);
      }
    } else {
      this.normalizedChartBarHeights = [];
    }
  }

  ngOnDestroy(): void {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }
  }

  clearAllResults(): void {
    if (confirm('Are you sure you want to clear all test results? This action cannot be undone.')) {
      this.progressService.clearResults();
    }
  }

}

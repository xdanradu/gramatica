import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const TIMER_FEATURE_KEY = 'wizzardTimerEnabled';
const STUDY_MODE_FEATURE_KEY = 'studyModeEnabled';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  private isBrowser: boolean;
  private isTimerEnabledSubject: BehaviorSubject<boolean>;
  public isTimerEnabled$: Observable<boolean>;

  private isStudyModeEnabledSubject: BehaviorSubject<boolean>;
  public isStudyModeEnabled$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const initialTimerState = this.loadTimerState();
    this.isTimerEnabledSubject = new BehaviorSubject<boolean>(initialTimerState);
    this.isTimerEnabled$ = this.isTimerEnabledSubject.asObservable();

    const initialStudyModeState = this.loadStudyModeState();
    this.isStudyModeEnabledSubject = new BehaviorSubject<boolean>(initialStudyModeState);
    this.isStudyModeEnabled$ = this.isStudyModeEnabledSubject.asObservable();
  }

  private loadTimerState(): boolean {
    if (this.isBrowser) {
      const storedState = localStorage.getItem(TIMER_FEATURE_KEY);
      if (storedState === null) {
        // Default to true if no setting is stored
        localStorage.setItem(TIMER_FEATURE_KEY, 'true');
        return true;
      }
      return storedState === 'true';
    }
    return true; // Default for SSR or non-browser environments
  }

  getIsTimerEnabled(): boolean {
    return this.isTimerEnabledSubject.value;
  }

  setIsTimerEnabled(isEnabled: boolean): void {
    if (this.isBrowser) {
      localStorage.setItem(TIMER_FEATURE_KEY, String(isEnabled));
    }
    this.isTimerEnabledSubject.next(isEnabled);
  }

  private loadStudyModeState(): boolean {
    if (this.isBrowser) {
      const storedState = localStorage.getItem(STUDY_MODE_FEATURE_KEY);
      if (storedState === null) {
        // Default to false if no setting is stored
        localStorage.setItem(STUDY_MODE_FEATURE_KEY, 'false');
        return false;
      }
      return storedState === 'true';
    }
    return false; // Default for SSR or non-browser environments
  }

  getIsStudyModeEnabled(): boolean {
    return this.isStudyModeEnabledSubject.value;
  }

  setIsStudyModeEnabled(isEnabled: boolean): void {
    if (this.isBrowser) {
      localStorage.setItem(STUDY_MODE_FEATURE_KEY, String(isEnabled));
    }
    this.isStudyModeEnabledSubject.next(isEnabled);
  }
}

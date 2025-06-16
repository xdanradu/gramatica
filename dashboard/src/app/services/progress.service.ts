import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TestResult {
  date: number; // Timestamp, serves as ID
  score: number;
  totalQuestions: number;
  timeUp: boolean; // True if the timer expired
}

const TEST_RESULTS_KEY = 'testResults';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private isBrowser: boolean;
  private resultsSubject: BehaviorSubject<TestResult[]>;
  public results$: Observable<TestResult[]>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const initialResults = this.loadResults();
    this.resultsSubject = new BehaviorSubject<TestResult[]>(initialResults);
    this.results$ = this.resultsSubject.asObservable();
  }

  private loadResults(): TestResult[] {
    if (this.isBrowser) {
      const storedResults = localStorage.getItem(TEST_RESULTS_KEY);
      if (storedResults) {
        try {
          return JSON.parse(storedResults) as TestResult[];
        } catch (e) {
          console.error('Error parsing test results from localStorage', e);
          localStorage.removeItem(TEST_RESULTS_KEY); // Clear corrupted data
          return [];
        }
      }
    }
    return [];
  }

  private saveResults(results: TestResult[]): void {
    if (this.isBrowser) {
      localStorage.setItem(TEST_RESULTS_KEY, JSON.stringify(results));
    }
  }

  addResult(data: { score: number; totalQuestions: number; timeUp: boolean }): void {
    if (!this.isBrowser) return;

    const newResult: TestResult = {
      ...data,
      date: Date.now() // Timestamp
    };
    const currentResults = this.resultsSubject.value;
    // Add new result and keep results sorted by date descending (newest first)
    // Or sort when retrieving/displaying. For simplicity, add to end and sort in component if needed.
    const updatedResults = [...currentResults, newResult];
    
    this.resultsSubject.next(updatedResults);
    this.saveResults(updatedResults);
  }

  getResults(): TestResult[] {
    return this.resultsSubject.value;
  }

  clearResults(): void {
    if (this.isBrowser) {
      localStorage.removeItem(TEST_RESULTS_KEY);
    }
    this.resultsSubject.next([]);
  }
}

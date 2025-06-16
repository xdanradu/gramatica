import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../shared/types/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) protected platformId: Object,) {
    this.applyTheme(this.themeSubject.value);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getInitialTheme(): Theme {
    if(this.isBrowser()){
    const savedTheme = localStorage.getItem('theme') as Theme;
    return (savedTheme === 'light' || savedTheme === 'dark') 
      ? savedTheme 
      : 'dark'; // Default theme
    }
    return 'light';
  }

  applyTheme(theme: Theme): void {
    if(this.isBrowser()){
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.themeSubject.next(theme);
    }
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}

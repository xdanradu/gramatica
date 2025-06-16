import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly hardcodedUsername = 'user';
  private readonly hardcodedPassword = 'password';
  private readonly authTokenKey = 'authToken'; // Key for localStorage
  private readonly hardcodedToken = 'dummyAuthToken123'; // Hardcoded token

  private _isLoggedIn = signal(false);
  public isLoggedIn = this._isLoggedIn.asReadonly();

  // Store the URL the user was trying to access
  private redirectUrl: string | null = null;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const token = localStorage.getItem(this.authTokenKey);
      if (token === this.hardcodedToken) {
        this._isLoggedIn.set(true);
      }
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
      this._isLoggedIn.set(true);
      if (this.isBrowser) {
        localStorage.setItem(this.authTokenKey, this.hardcodedToken);
      }
      const urlToNavigate = this.redirectUrl || '/wizzard';
      this.redirectUrl = null; // Clear the redirect URL
      this.router.navigate([urlToNavigate]);
      return true;
    }
    return false;
  }

  logout(): void {
    this._isLoggedIn.set(false);
    if (this.isBrowser) {
      localStorage.removeItem(this.authTokenKey);
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return localStorage.getItem(this.authTokenKey) === this.hardcodedToken && this._isLoggedIn();
    }
    return this._isLoggedIn();
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
}

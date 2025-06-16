import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ThemeSwitcherComponent import removed
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule], // ThemeSwitcherComponent removed from imports
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  isLoggedIn: any; // Default value, will be updated in ngOnInit
  showLogoutDropdown: WritableSignal<boolean> = signal(false);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  toggleLogoutDropdown(): void {
    this.showLogoutDropdown.update(value => !value);
  }

  performLogout(): void {
    this.authService.logout();
    this.showLogoutDropdown.set(false); // Close dropdown after logout
  }
}

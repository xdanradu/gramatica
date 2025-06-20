import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule  } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [AsyncPipe, CommonModule ],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  isDarkTheme$!: Observable<boolean>;
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.theme$.pipe(
        map(theme=>theme === 'dark')
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

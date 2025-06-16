import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TopNavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gramatica-moderna';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Theme service is initialized in constructor
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleService } from '../../services/feature-toggle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isTimerEnabled: boolean = true;
  isStudyModeEnabled: boolean = false;

  constructor(private featureToggleService: FeatureToggleService) {}

  ngOnInit(): void {
    this.isTimerEnabled = this.featureToggleService.getIsTimerEnabled();
    this.isStudyModeEnabled = this.featureToggleService.getIsStudyModeEnabled();
  }

  onTimerToggleChange(): void {
    this.featureToggleService.setIsTimerEnabled(this.isTimerEnabled);
  }

  onStudyModeToggleChange(): void {
    this.featureToggleService.setIsStudyModeEnabled(this.isStudyModeEnabled);
  }
}

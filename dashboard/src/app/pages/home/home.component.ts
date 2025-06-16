import { Component, inject } from '@angular/core';
import { data } from '../../db/data';
import { banners } from '../../db/banner-images';
import { SharedImageComponent } from '../../components/shared-image/shared-image.component';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ProductBundlesComponent } from '../../components/product-bundles/product-bundles.component'; // Import ProductBundlesComponent


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule, // Add CommonModule for *ngIf
    SharedImageComponent,
    ProductBundlesComponent // Add ProductBundlesComponent
  ]
})
export class HomeComponent {
  allCategoriesAndProducts = data;
  homepageBannerImage = banners[0].url;

  authService = inject(AuthService); // Inject AuthService
}

import { Component, inject } from '@angular/core'; // Import inject
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-product-bundles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-bundles.component.html',
  styleUrl: './product-bundles.component.scss'
})
export class ProductBundlesComponent {
  private router = inject(Router); // Inject Router

  bundles = [
    {
      id: 'free', // Added id for potential tracking
      title: 'Free Trial',
      description: [
        'Get a taste of our platform.',
        'Perfect for a quick evaluation.',
        'No commitment required.'
      ],
      price: '0 RON',
      benefits: [
        '1 free test',
        '1 week access'
      ]
    },
    {
      id: 'monthly', // Added id
      title: 'Monthly Subscription',
      description: [
        'Unlock full access to all features.',
        'Flexible month-to-month plan.',
        'Cancel anytime.'
      ],
      price: '100 RON',
      benefits: [
        'Access to all tests',
        'Unlimited evaluation trials',
        'Extensive explanations for every answer'
      ]
    },
    {
      id: 'yearly', // Added id
      title: 'Yearly Subscription',
      description: [
        'Best value for long-term learning.',
        'Save big with an annual commitment.',
        'All premium features included.'
      ],
      price: '1000 RON',
      benefits: [
        'Access to all tests',
        'Unlimited evaluation trials',
        'Extensive explanations for every answer'
      ]
    }
  ];

  selectBundle(bundle: any): void {
    // Navigate to the checkout page, passing bundle data via router state
    this.router.navigate(['/checkout'], { state: { bundle: bundle } });
  }
}

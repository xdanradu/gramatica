import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-fast-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fast-checkout.component.html',
  styleUrl: './fast-checkout.component.scss'
})
export class FastCheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router); // Inject Router
  private route = inject(ActivatedRoute); // Inject ActivatedRoute

  userDetailsForm!: FormGroup;
  paymentDetailsForm!: FormGroup;
  isPaymentSectionVisible = false;
  selectedBundle: any = null; // To store bundle details if passed
  isFreeBundle: boolean = false; // Added for free bundle logic

  ngOnInit(): void {
    // Optionally retrieve bundle information if passed via state or query params
    this.selectedBundle = history.state?.bundle; // Example if using router state

    if (this.selectedBundle && this.selectedBundle.price === '0 RON') {
      this.isFreeBundle = true;
    }

    this.userDetailsForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]]
    });

    this.paymentDetailsForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]], // MM/YY
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  get uf() { return this.userDetailsForm.controls; }
  get pf() { return this.paymentDetailsForm.controls; }

  proceedToPayment(): void {
    this.userDetailsForm.markAllAsTouched();
    if (this.userDetailsForm.valid) {
      if (this.isFreeBundle) {
        this.completePurchase(); // Directly complete if bundle is free
      } else {
        this.isPaymentSectionVisible = true;
        // Optionally scroll to payment section
        setTimeout(() => {
          document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      console.log('User details form is invalid');
    }
  }

  completePurchase(): void {
    if (this.isFreeBundle) {
      console.log('Processing free subscription!');
      console.log('User Details:', this.userDetailsForm.value);
      if (this.selectedBundle) {
        console.log('Selected Bundle:', this.selectedBundle);
      }
      alert('Subscription Activated! (Simulated)');
      this.router.navigate(['/']); // Navigate to home or a success page
    } else {
      this.paymentDetailsForm.markAllAsTouched();
      if (this.paymentDetailsForm.valid) {
        console.log('Checkout complete!');
        console.log('User Details:', this.userDetailsForm.value);
        console.log('Payment Details:', this.paymentDetailsForm.value);
        if (this.selectedBundle) {
          console.log('Selected Bundle:', this.selectedBundle);
        }
        // Here you would typically call a service to process the payment
        alert('Purchase Successful! (Simulated)');
        this.router.navigate(['/']); // Navigate to home or a success page
      } else {
        console.log('Payment details form is invalid');
      }
    }
  }
}

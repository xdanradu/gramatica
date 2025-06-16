import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-shared-image',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './shared-image.component.html',
  styleUrl: './shared-image.component.scss'
})
export class SharedImageComponent {
  @Input() imageUrl!: string;
}

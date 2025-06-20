import { Directive, ElementRef, Input, OnChanges, SimpleChanges, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') text: string | null = null;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.text);
    if (changes['text'] && this.text !== null) {
      this.updateHighlight();
    }
  }

  private updateHighlight(): void {
    if (!this.text) {
      this.el.nativeElement.innerHTML = '';
      return;
    }

    let result = '';
    let isOdd = true;
    let i = 0;

    while (i < this.text.length) {
      if (this.text[i] === '*') {
        result += isOdd ? '<span class="highlight">' : '</span>';
        isOdd = !isOdd;
        i++;
      } else {
        result += this.text[i];
        i++;
      }
    }

    // Sanitize the HTML to prevent XSS attacks
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, result);
    this.el.nativeElement.innerHTML = sanitizedHtml || result;
  }
}
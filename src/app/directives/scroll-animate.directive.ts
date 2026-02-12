import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements AfterViewInit, OnDestroy {
  @Input() appScrollAnimate: 'slide-left' | 'slide-right' | 'fall-down' | 'fade-in' | 'slide-up' = 'fade-in';
  @Input() delay: number = 0; // delay in milliseconds
  @Input() threshold: number = 0.2; // how much of element needs to be visible

  private observer: IntersectionObserver | null = null;
  private animated = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Set initial state - element starts hidden
    this.renderer.addClass(this.el.nativeElement, `animate-${this.appScrollAnimate}-init`);
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          
          if (this.delay > 0) {
            setTimeout(() => {
              this.triggerAnimation();
            }, this.delay);
          } else {
            this.triggerAnimation();
          }

          // Optional: disconnect after animation triggers
          // this.observer?.disconnect();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private triggerAnimation(): void {
    const element = this.el.nativeElement;
    
    // Remove initial hidden state
    this.renderer.removeClass(element, `animate-${this.appScrollAnimate}-init`);
    
    // Add animation class
    this.renderer.addClass(element, `animate-${this.appScrollAnimate}`);
  }
}

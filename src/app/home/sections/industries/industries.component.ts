import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.html',
  styleUrls: ['industries.css']
})
export class Industry implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private observer: IntersectionObserver | null = null;
  private currentIndex = 0;
  private isScrolling = false;
  private cardWidth = 480; // card width + gap

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    this.setupScrollHandler();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('wheel', this.handleScroll);
  }

  private setupIntersectionObserver(): void {
    if (!this.scrollContainer) return;

    const options = {
      root: this.scrollContainer.nativeElement,
      rootMargin: '0px',
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, options);

    const cards = this.scrollContainer.nativeElement.querySelectorAll('.heroCard');
    cards.forEach((card) => {
      this.observer?.observe(card);
    });
  }

  private setupScrollHandler(): void {
    window.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
  }

  private handleScroll(event: WheelEvent): void {
    // Only intercept if scrolling vertically with mouse wheel
    if (event.deltaY === 0) return;

    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.heroCard');
    
    if (this.isScrolling) {
      event.preventDefault();
      return;
    }

    this.isScrolling = true;

    if (event.deltaY > 0) {
      // Scrolling down - swipe cards to the right (show next card)
      this.currentIndex = Math.min(this.currentIndex + 1, cards.length - 1);
    } else {
      // Scrolling up - swipe cards to the left (show previous card)
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }

    this.scrollToCard(this.currentIndex);

    // Reset scrolling flag
    setTimeout(() => {
      this.isScrolling = false;
    }, 600);
  }

  private scrollToCard(index: number): void {
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.heroCard');
    const card = cards[index] as HTMLElement;
    
    if (!card) return;

    // Calculate scroll position to center the card
    const containerWidth = container.clientWidth;
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const cardCenterRelativeToContainer = cardRect.left - containerRect.left + (cardRect.width / 2);
    const targetScrollLeft = container.scrollLeft + cardCenterRelativeToContainer - (containerWidth / 2);

    // Smooth horizontal scroll
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }
}

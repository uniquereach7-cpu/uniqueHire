import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.html',
  styleUrls: ['./industries.css'],
})
export class Industry implements AfterViewInit, OnDestroy {
  @ViewChild('industriesSection', { static: true }) industriesSection!: ElementRef<HTMLElement>;
  @ViewChild('industriesStage', { static: true }) industriesStage!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initStack());
  }

  private initStack(): void {
    const section = this.industriesSection.nativeElement;
    const stage = this.industriesStage.nativeElement;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('.heroCard'));

    if (!cards.length) return;

    // Clean old triggers on hot reloads
    ScrollTrigger.getAll().forEach(t => t.kill());

    this.ctx = gsap.context(() => {
      // z-index order: later cards above earlier cards
      cards.forEach((c, i) => (c.style.zIndex = String(i + 1)));

      // Start state:
      // card[0] is visible.
      // all upcoming cards sit below the viewport.
      gsap.set(cards[0], { yPercent: 0, scale: 1 });
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { yPercent: 115, scale: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,          // pin the stage itself
          start: 'top top',
          end: `+=${(cards.length - 1) * 900}`, // duration per card
          scrub: true,
          pin: true,               // fix the screen
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each segment: next card slides up and covers the previous.
      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i], { yPercent: 0, ease: 'none', duration: 1 }, i - 1);
        tl.to(cards[i - 1], { scale: 0.98, ease: 'none', duration: 1 }, i - 1);
      }
    }, section);

    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

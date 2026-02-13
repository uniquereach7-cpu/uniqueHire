import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Leaders} from '../about-us/sections/leaders/leaders.component'
import { Missions } from './sections/missions/missions';
import { whous} from './sections/whous/whous.component'
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,Leaders,Missions,whous],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css'],
})

export class Aboutus implements AfterViewInit, OnDestroy {
  @ViewChild('heroRoot', { static: true }) heroRoot!: ElementRef<HTMLElement>;

  private io?: IntersectionObserver;
  private animated = false;
  private animationDuration = 2200; // ms

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.heroRoot || !this.heroRoot.nativeElement) { return; }

      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated) {
              this.startCounters();
              this.animated = true;
              observer.disconnect();
            }
          });
        }, { threshold: 0.25 });
        this.io.observe(this.heroRoot.nativeElement);
      } else {
        // fallback
        this.startCounters();
        this.animated = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.io) { this.io.disconnect(); this.io = undefined; }
  }

  private startCounters(): void {
    const root = this.heroRoot.nativeElement;
    const statEls = Array.from(root.querySelectorAll<HTMLElement>('.stat-value'));
    const targets = statEls.map(el => {
      const raw = el.getAttribute('data-target') || '0';
      const numeric = parseFloat(raw.replace(/,/g, ''));
      return isNaN(numeric) ? 0 : numeric;
    });

    const duration = this.animationDuration;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 2); // easeOutQuad

      statEls.forEach((el, i) => {
        const value = Math.floor(eased * targets[i]);
        el.textContent = this.formatNumber(value); // CSS ::after adds '+'
      });

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        // final exact values
        statEls.forEach((el, i) => el.textContent = this.formatNumber(targets[i]));
      }
    };

    requestAnimationFrame(step);
  }

  private formatNumber(n: number): string {
    return Math.round(n).toLocaleString();
  }
}

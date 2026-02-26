import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { Homeservice } from './homeservice/homeservice';
import { Homegcc } from './homegcc/homegcc';
import { Homeaboutus } from './homeaboutus/homeaboutus';
import { Homeindustries } from './homeindustries/homeindustries';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimateDirective,Homeservice,Homegcc,Homeaboutus,Homeindustries],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  clients = [
    { name: 'Client 1', logo: 'assets/clients/logo1.png' },
    { name: 'Client 2', logo: 'assets/clients/logo2.png' },
    { name: 'Client 3', logo: 'assets/clients/logo3.png' },
    { name: 'Client 4', logo: 'assets/clients/logo4.png' },
    { name: 'Client 5', logo: 'assets/clients/logo5.png' },
    { name: 'Client 6', logo: 'assets/clients/logo6.png' },
  ];

  private stats = [
    { id: 'stat-0', value: 95, suffix: '%' },
    { id: 'stat-1', value: 250, suffix: '+' },
    { id: 'stat-2', value: 7200, suffix: '+' },
  ];

  private observers: IntersectionObserver[] = [];
  private started = new Set<string>();
  private currentIndex = 0;
  private isScrolling = false;
  private wheelTimeout: any;

  ngAfterViewInit(): void {
    this.setupStatAnimations();

  }

  ngOnDestroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    
    if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
  }

  private setupStatAnimations(): void {
    const options = { root: null, threshold: 0.35 };

    this.stats.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;

      el.innerText = `0${stat.suffix}`;

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.started.has(stat.id)) {
            this.started.add(stat.id);
            this.animateCount(el, stat.value, stat.suffix);
            io.disconnect();
          }
        });
      }, options);

      io.observe(el);
      this.observers.push(io);
    });
  }

  private animateCount(
    element: HTMLElement,
    targetValue: number,
    suffix: string,
    duration: number = 2000
  ): void {
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);

      element.innerText = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }

  
}

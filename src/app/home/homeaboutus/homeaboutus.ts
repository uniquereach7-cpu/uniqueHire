import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-homeaboutus',
  imports: [ScrollAnimateDirective], 
  templateUrl: './homeaboutus.html',
  styleUrl: './homeaboutus.css',
})
export class Homeaboutus implements OnInit, OnDestroy {
  // 1. All THREE variables bound to your HTML
  clientsCount: number = 0;
  employeesCount: number = 0;
  yearsCount: number = 0; // <-- Added this!

  // 2. Set your actual final target numbers here 
  private readonly clientsTarget = 500;   
  private readonly employeesTarget = 1000; 
  private readonly yearsTarget = 20;      // <-- Added this!

  private observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 3. Trigger all THREE counting animations! 
          this.animateCount('clientsCount', this.clientsTarget, 2000);
          this.animateCount('employeesCount', this.employeesTarget, 2500);
          this.animateCount('yearsCount', this.yearsTarget, 1500); // <-- Added this!
          
          this.observer?.unobserve(entry.target); 
        }
      });
    }, options);

    const section = this.el.nativeElement.querySelector('#about-stats-section');
    if (section) {
      this.observer.observe(section);
    }
  }

  // 4. Updated the allowed property names to include 'yearsCount'
  private animateCount(property: 'clientsCount' | 'employeesCount' | 'yearsCount', target: number, duration: number) {
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      this[property] = Math.floor(progress * target);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this[property] = target; 
      }
    };
    
    window.requestAnimationFrame(step);
  }
}
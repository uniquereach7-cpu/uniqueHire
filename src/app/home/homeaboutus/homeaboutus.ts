import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-homeaboutus',
  imports: [],
  templateUrl: './homeaboutus.html',
  styleUrl: './homeaboutus.css',
})
export class Homeaboutus implements OnInit, AfterViewInit, OnDestroy {
  clientsCount:   number = 0;
  employeesCount: number = 0;
  yearsCount:     number = 0;

  private readonly clientsTarget   = 500;
  private readonly employeesTarget = 1000;
  private readonly yearsTarget     = 30;

  private observer: IntersectionObserver | undefined;
  private scrollTriggers: ScrollTrigger[] = [];
  private counted = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupCounterObserver();
    this.setupGsapReveal();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.scrollTriggers.forEach(t => t.kill());
  }

  /* Intersection observer triggers the counting animation */
  private setupCounterObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.counted) {
            this.counted = true;
            this.animateCount('clientsCount',   this.clientsTarget,   2000);
            this.animateCount('employeesCount', this.employeesTarget, 2400);
            this.animateCount('yearsCount',     this.yearsTarget,     1600);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.25 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  /* GSAP stagger reveal for stat numbers */
  private setupGsapReveal(): void {
    const nums = this.el.nativeElement.querySelectorAll('.about__stat');
    gsap.fromTo(
      nums,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el.nativeElement.querySelector('.about__stats'),
          start: 'top 78%',
          once: true,
        },
      }
    );

    const top = this.el.nativeElement.querySelectorAll('.about__top-left, .about__top-right');
    gsap.fromTo(
      top,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el.nativeElement,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  private animateCount(
    property: 'clientsCount' | 'employeesCount' | 'yearsCount',
    target: number,
    duration: number
  ): void {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      this[property] = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else this[property] = target;
    };
    requestAnimationFrame(step);
  }
}

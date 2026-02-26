import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Homeservice } from './homeservice/homeservice';
import { Homegcc } from './homegcc/homegcc';
import { Homeaboutus } from './homeaboutus/homeaboutus';
import { Homeindustries } from './homeindustries/homeindustries';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Homeservice, Homegcc, Homeaboutus, Homeindustries],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  private scrollTriggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.runHeroEntrance();
    this.setupHeroParallax();
    this.setupSectionTransitions();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(t => t.kill());
  }

  /* Staggered hero entrance on page load */
  private runHeroEntrance(): void {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero__badge',     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' })
      .to('.hero__title',     { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform' }, '-=0.25')
      .to('.hero__sub',       { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', clearProps: 'opacity,transform' }, '-=0.45')
      .to('.hero__actions',   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' }, '-=0.4')
      .to('.hero__stats-bar', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', clearProps: 'opacity,transform' }, '-=0.35');

    // Set initial positions for animation
    gsap.set('.hero__badge',     { y: 20 });
    gsap.set('.hero__title',     { y: 60 });
    gsap.set('.hero__sub',       { y: 30 });
    gsap.set('.hero__actions',   { y: 20 });
    gsap.set('.hero__stats-bar', { y: 30 });

    // Re-run timeline (GSAP timelines run from current state)
    tl.restart();
  }

  /* Parallax on the hero background image */
  private setupHeroParallax(): void {
    const st = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set('.hero__bg', { yPercent: self.progress * 22 });
      }
    });
    this.scrollTriggers.push(st);
  }

  /* Each section slides up as it enters the viewport */
  private setupSectionTransitions(): void {
    const selectors = [
      'app-homeaboutus',
      'app-homeservice',
      'app-homegcc',
      'app-homeindustries',
      '.clients'
    ];

    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 70 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          });
        }
      });
      this.scrollTriggers.push(st);
    });
  }
}

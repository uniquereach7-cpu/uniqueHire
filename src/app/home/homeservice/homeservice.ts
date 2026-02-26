import { Component, AfterViewInit, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Service {
  num: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
}

@Component({
  selector: 'app-homeservice',
  imports: [],
  templateUrl: './homeservice.html',
  styleUrl: './homeservice.css',
})
export class Homeservice implements AfterViewInit {
  activeIndex: number = 0;

  services: Service[] = [
    {
      num: '01',
      title: 'Talent Solutions',
      tag: 'Recruitment & Staffing',
      desc: 'AI-driven talent platform: sourcing, screening, onboarding and continuous engagement — designed to find the right people, fast.',
      img: 'assets/talentsolutions.jpeg',
    },
    {
      num: '02',
      title: 'Technology Consulting',
      tag: 'Digital Transformation',
      desc: 'Modernizing systems, improving productivity, and embracing automation for your business. We bridge the gap between technology and growth.',
      img: 'assets/technology.jpeg',
    },
    {
      num: '03',
      title: 'GCC Setup',
      tag: 'Global Operations',
      desc: 'End-to-end support for establishing your Global Capability Center in strategic locations — from site selection to team formation.',
      img: 'assets/GCC.png',
    },
    {
      num: '04',
      title: 'Learning & Development',
      tag: 'Capability Building',
      desc: 'Training programs and partnerships preparing professionals for the evolving tech landscape and future business challenges.',
      img: 'assets/learning.jpeg',
    },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupRowReveal();
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  private setupRowReveal(): void {
    const rows = this.el.nativeElement.querySelectorAll('.svc__row');
    gsap.fromTo(
      rows,
      { opacity: 0, x: -28 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.11,
        duration: 0.72,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el.nativeElement,
          start: 'top 72%',
          once: true,
        },
      }
    );
  }
}

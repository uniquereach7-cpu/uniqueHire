import { Component, AfterViewInit, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Industry {
  title: string;
  img: string;
  desc: string;
}

@Component({
  selector: 'app-homeindustries',
  imports: [],
  templateUrl: './homeindustries.html',
  styleUrl: './homeindustries.css',
})
export class Homeindustries implements AfterViewInit {
  hoveredIndex: number = 0;

  industries: Industry[] = [
    {
      title: 'Banking & Finance',
      img: 'assets/Banking.jpg',
      desc: 'Specialized talent and technology solutions for financial institutions navigating digital transformation.',
    },
    {
      title: 'Healthcare',
      img: 'assets/Medical.jpg',
      desc: 'Enhancing healthcare delivery with skilled professionals and innovative technology partnerships.',
    },
    {
      title: 'Technology',
      img: 'assets/indusdev.jpeg',
      desc: 'Building high-performance tech teams for startups and enterprises across the innovation spectrum.',
    },
    {
      title: 'Retail',
      img: 'assets/indusretail.jpeg',
      desc: 'Supporting retail evolution with workforce strategies aligned to customer experience goals.',
    },
    {
      title: 'Manufacturing',
      img: 'assets/Other.jpg',
      desc: 'Operational excellence through precision staffing and process optimization solutions.',
    },
    {
      title: 'Other Industries',
      img: 'assets/Other1.jpg',
      desc: 'Versatile expertise across diverse sectors — no industry too niche, no challenge too complex.',
    },
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupRowReveal();
  }

  private setupRowReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.ind__item');
    gsap.fromTo(
      items,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.09,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el.nativeElement.querySelector('.ind__list'),
          start: 'top 78%',
          once: true,
        },
      }
    );
  }
}

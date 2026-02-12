import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missions.html',
  styleUrl: './missions.css',
})
export class Missions implements AfterViewInit, OnDestroy {
  @ViewChild('arcSection', { static: false }) arcSection!: ElementRef<HTMLElement>;
  @ViewChild('arcPath', { static: false }) arcPath!: ElementRef<SVGPathElement>;
  @ViewChild('node1', { static: false }) node1!: ElementRef<HTMLElement>;
  @ViewChild('node2', { static: false }) node2!: ElementRef<HTMLElement>;
  @ViewChild('node3', { static: false }) node3!: ElementRef<HTMLElement>;
  @ViewChild('visionText', { static: false }) visionText!: ElementRef<HTMLElement>;
  @ViewChild('missionText', { static: false }) missionText!: ElementRef<HTMLElement>;
  @ViewChild('valuesText', { static: false }) valuesText!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initScrollAnimation();
    });
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
      this.ctx = undefined;
    }
  }

  private initScrollAnimation(): void {
    if (!this.arcSection || !this.arcPath || !this.node1 || !this.node2 || !this.node3) {
      return;
    }

    const section = this.arcSection.nativeElement;
    const arcPath = this.arcPath.nativeElement;
    const nodes = [
      this.node1.nativeElement, // Vision
      this.node2.nativeElement, // Mission
      this.node3.nativeElement // Values
    ];
    const visionText = this.visionText.nativeElement;
    const missionText = this.missionText.nativeElement;
    const valuesText = this.valuesText.nativeElement;

    this.ctx = gsap.context(() => {
      // Ensure initial positions (center nodes at xPercent/yPercent for proper alignment)
      nodes.forEach(n => gsap.set(n, { xPercent: -50, yPercent: -50, autoAlpha: 0 }));

      // Helper to toggle active classes (0 = vision, 1 = mission, 2 = values)
      const setActive = (index: number) => {
        nodes.forEach((n, i) => n.classList.toggle('active', i === index));
        visionText.classList.toggle('active', index === 0);
        missionText.classList.toggle('active', index === 1);
        valuesText.classList.toggle('active', index === 2);
      };

      // Create scrubbed timeline and pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // 3 segments -> use 300% to give one viewport-length per node; tune as needed
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      });

      // SEQUENCE: Mission (node2) -> Vision (node1) -> Values (node3)
      // Each block moves the node from path start -> about center (start:0 -> end:0.5),
      // fades it in while moving, then fades it out (so only one is visible at a time).

      // 1) Mission (node2)
      tl.to(nodes[1], {
        motionPath: {
          path: arcPath,
          align: arcPath,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0.5
        },
        autoAlpha: 1,
        scale: 1.05,
        ease: 'none',
        duration: 1
      }, 0)
        .call(() => setActive(1))
        // small fade-out after center so next node can take focus
        .to(nodes[1], { autoAlpha: 0, scale: 0.95, duration: 0.18, ease: 'power1.in' }, '>-0.05');

      // 2) Vision (node1) - starts AFTER mission finishes
      tl.to(nodes[0], {
        motionPath: {
          path: arcPath,
          align: arcPath,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0.5
        },
        autoAlpha: 1,
        scale: 1.05,
        ease: 'none',
        duration: 1
      }, '>-0.02')
        .call(() => setActive(0))
        .to(nodes[0], { autoAlpha: 0, scale: 0.95, duration: 0.18, ease: 'power1.in' }, '>-0.05');

      // 3) Values (node3)
      tl.to(nodes[2], {
        motionPath: {
          path: arcPath,
          align: arcPath,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0.5
        },
        autoAlpha: 1,
        scale: 1.05,
        ease: 'none',
        duration: 1
      }, '>-0.02')
        .call(() => setActive(2));

    }, section);

    // Ensure ScrollTrigger recalculates on resize
    ScrollTrigger.refresh();
  }
}

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

      // Helper to toggle active classes
      const setActive = (index: number) => {
        nodes.forEach((n, i) => n.classList.toggle('active', i === index));
        visionText.classList.toggle('active', index === 0);
        missionText.classList.toggle('active', index === 1);
        valuesText.classList.toggle('active', index === 2);
      };

      // Define sequence: order of nodes to appear, mapped to content index
      // Format: { node: HTMLElement, contentIndex: 0|1|2 }
      // Sequence: Mission -> Vision -> Values
      const nodesOrder = [
        { node: nodes[1], contentIndex: 1 },  // Mission (contentIndex 1)
        { node: nodes[0], contentIndex: 0 },  // Vision (contentIndex 0)
        { node: nodes[2], contentIndex: 2 }   // Values (contentIndex 2)
      ];

      // Pick the moment to switch content along the path (0..1)
      const midPoint = 0.30; // <-- change this to 0.25/0.3/0.35 to tune when the content switches

      // Main scrubbed timeline - pin the section while the animation plays
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=360%', // enough scroll space for 3 nodes; tweak if needed
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Iterate nodes sequentially
      nodesOrder.forEach((item, idx) => {
        const isLast = idx === nodesOrder.length - 1;

        // PART A: start -> midPoint (fade + move to mid)
        tl.to(item.node, {
          motionPath: {
            path: arcPath,
            align: arcPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: midPoint
          },
          autoAlpha: 1,
          scale: 1.05,
          ease: 'none',
          duration: 1
        });

        // Callback when node hits midPoint (this is the earlier trigger)
        tl.call(() => setActive(item.contentIndex));

        // PART B: midPoint -> end (continue to the right end of path)
        tl.to(item.node, {
          motionPath: {
            path: arcPath,
            align: arcPath,
            alignOrigin: [0.5, 0.5],
            start: midPoint,
            end: 1
          },
          ease: 'none',
          duration: 1
        });

        // Fade out (except last node)
        if (!isLast) {
          tl.to(item.node, { autoAlpha: 0, scale: 0.95, duration: 0.18, ease: 'power1.in' });
        }
      });

    }, section);

    // Refresh to calculate sizes and path lengths correctly
    ScrollTrigger.refresh();
  }
}

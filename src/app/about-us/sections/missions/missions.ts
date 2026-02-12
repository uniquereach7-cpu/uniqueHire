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
    const path = this.arcPath.nativeElement;
    const nodes = [
      this.node1.nativeElement,
      this.node2.nativeElement,
      this.node3.nativeElement
    ];
    const textElements = [
      this.visionText.nativeElement,
      this.missionText.nativeElement,
      this.valuesText.nativeElement
    ];

    // Get path length for calculations
    const pathLength = path.getTotalLength();

    // Calculate positions along the path (0%, 50%, 100%)
    const positions = [0, 0.5, 1];

    this.ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            this.updateActiveNode(self.progress, nodes, textElements);
          }
        }
      });

      // Animate each node along the path
      nodes.forEach((node, index) => {
        const startProgress = positions[index];
        const endProgress = positions[index === nodes.length - 1 ? index : index + 1] || 1;

        // Get start and end points on the path
        const startPoint = path.getPointAtLength(startProgress * pathLength);
        const endPoint = path.getPointAtLength(endProgress * pathLength);

        // Set initial position
        gsap.set(node, {
          x: startPoint.x - 100, // offset for node center (half of node width)
          y: startPoint.y - 100,  // offset for node center (half of node height)
          rotation: 0,
          transformOrigin: 'center center'
        });

        // Animate along path using MotionPath
        tl.to(node, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
          },
          duration: 1,
          ease: 'none'
        }, index * 0.5);

        // Add subtle rotation as nodes move
        tl.to(node, {
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 1,
          ease: 'sine.inOut'
        }, index * 0.5);
      });

    }, section);
  }

  private updateActiveNode(
    progress: number,
    nodes: HTMLElement[],
    textElements: HTMLElement[]
  ): void {
    // Determine which node should be active based on scroll progress
    let activeIndex = 0;
    
    if (progress < 0.33) {
      activeIndex = 0; // Vision
    } else if (progress < 0.66) {
      activeIndex = 1; // Mission
    } else {
      activeIndex = 2; // Core Values
    }

    // Update active classes for nodes
    nodes.forEach((node, index) => {
      if (index === activeIndex) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // Update active classes for text content
    textElements.forEach((text, index) => {
      if (index === activeIndex) {
        text.classList.add('active');
      } else {
        text.classList.remove('active');
      }
    });
  }
}

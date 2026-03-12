import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Leaders } from './sections/leaders/leaders.component';

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

interface ClientLogo {
  name: string;
  url: string;
  logo: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,Leaders],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css'],
})
export class Aboutus implements AfterViewInit, OnDestroy {
  @ViewChild('achievementsSection', { static: false })
  achievementsSection!: ElementRef<HTMLElement>;

  private io?: IntersectionObserver;
  private animated = false;

  stats = [
    { value: 10, suffix: '+', label: 'Years of experience' },
    { value: 500, suffix: '+', label: 'Professionals placed' },
    { value: 15, suffix: '+', label: 'Industries served' },
    { value: 70, suffix: '%', label: 'Repeat Clients' },
  ];

  displayValues: string[] = ['0', '0', '0', '0'];

  teamMembers: TeamMember[] = [
    { name: 'Bala M', role: 'Founder & Director', photo: 'https://i.pravatar.cc/400?u=bala' },
    {
      name: 'Vamshi Krishna',
      role: 'Co-Founder & Director',
      photo: 'https://i.pravatar.cc/400?u=vamshi',
    },
    {
      name: 'Prabhu',
      role: 'Co-Founder & Director',
      photo: 'https://i.pravatar.cc/400?u=prabhu',
    },
    {
      name: 'Rajesh Kaidam',
      role: 'Co-Founder & Director',
      photo: 'https://i.pravatar.cc/400?u=rajesh',
    },
    {
      name: 'Natarajan P',
      role: 'VP - Operations',
      photo: 'https://i.pravatar.cc/400?u=natarajan',
    },
    {
      name: 'Srinivas R',
      role: 'Sr. Recruitment Lead',
      photo: 'https://i.pravatar.cc/400?u=srinivas',
    },
    {
      name: 'Priya Sharma',
      role: 'HR Manager',
      photo: 'https://i.pravatar.cc/400?u=priya',
    },
    {
      name: 'Anil Kumar',
      role: 'Technical Recruiter',
      photo: 'https://i.pravatar.cc/400?u=anil',
    },
    {
      name: 'Deepa M',
      role: 'Client Relations',
      photo: 'https://i.pravatar.cc/400?u=deepa',
    },
    {
      name: 'Karthik V',
      role: 'Business Analyst',
      photo: 'https://i.pravatar.cc/400?u=karthik',
    },
    {
      name: 'Ravi Teja',
      role: 'IT Recruiter',
      photo: 'https://i.pravatar.cc/400?u=raviteja',
    },
    {
      name: 'Meena S',
      role: 'Operations Lead',
      photo: 'https://i.pravatar.cc/400?u=meena',
    },
    {
      name: 'Suresh B',
      role: 'Talent Acquisition',
      photo: 'https://i.pravatar.cc/400?u=suresh',
    },
    {
      name: 'Lavanya K',
      role: 'Account Manager',
      photo: 'https://i.pravatar.cc/400?u=lavanya',
    },
    {
      name: 'Venkat R',
      role: 'Delivery Manager',
      photo: 'https://i.pravatar.cc/400?u=venkat',
    },
  ];

  testimonialRowOne: Testimonial[] = [
    {
      name: 'John Braithwaite',
      role: 'Product Manager',
      company: 'TechCorp',
      quote:
        'They approach solutions creatively, considering multiple angles. The result was amazing, with open communication throughout.',
      avatar: 'https://i.pravatar.cc/100?u=john',
    },
    {
      name: 'Arvind Kumar',
      role: 'Head of Operations',
      company: 'DataSync',
      quote:
        'The UniqueHire team understood our challenges, provided tailored solutions, and impressed us with their attention to detail and commitment to excellence.',
      avatar: 'https://i.pravatar.cc/100?u=arvind',
    },
    {
      name: 'Sherry Sugarman',
      role: 'Founder and CEO',
      company: 'CloudNest',
      quote:
        'UniqueHire did a great job finding the right talent for us. They also excelled at understanding our culture. They were excellent at communication and very responsive.',
      avatar: 'https://i.pravatar.cc/100?u=sherry',
    },
    {
      name: 'Ben Swinford',
      role: 'CTO',
      company: 'InnoTech',
      quote:
        'UniqueHire impressed us with their recruitment expertise, candidate-focused approach, and consideration for team dynamics, while accommodating our schedule seamlessly.',
      avatar: 'https://i.pravatar.cc/100?u=ben',
    },
  ];

  testimonialRowTwo: Testimonial[] = [
    {
      name: 'Todd Tompkins',
      role: 'Principal Architect',
      company: 'NexGen Solutions',
      quote:
        "We're thrilled with the partnership. UniqueHire invested time to understand our business deeply, making it much more than a vendor-client relationship.",
      avatar: 'https://i.pravatar.cc/100?u=todd',
    },
    {
      name: 'Rajul Kadakia',
      role: 'CEO',
      company: 'OnCraze',
      quote:
        'I appreciate their approach that the client comes first, and they are always ready to tackle and fix any issues or concerns.',
      avatar: 'https://i.pravatar.cc/100?u=rajul',
    },
    {
      name: 'JayaPrasad Rao',
      role: 'Director',
      company: 'Reldyn',
      quote:
        "We've worked with other service providers, and UniqueHire stands out because they support and listen to us. At the end of the day, they do whatever it takes to deliver.",
      avatar: 'https://i.pravatar.cc/100?u=jayaprasad',
    },
    {
      name: 'Lisa Chen',
      role: 'VP Engineering',
      company: 'FinServe',
      quote:
        'They quickly deployed top candidates, adapted to feedback, and showed impressive flexibility in meeting deadlines and priorities. They felt like a true partner.',
      avatar: 'https://i.pravatar.cc/100?u=lisa',
    },
  ];

  clients: ClientLogo[] = [
    {
      name: 'Clutch',
      url: 'https://clutch.co',
      logo: 'https://framerusercontent.com/images/EuOtzvs8jP0WsYWoXn6eTqAyJQ.png?width=1200&height=324',
    },
    {
      name: 'GoodFirms',
      url: 'https://goodfirms.co',
      logo: 'https://framerusercontent.com/images/PjyRhzJHMc78iU1TMx3BUGq5u1M.png?width=1001&height=194',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
    {
      name: 'DesignRush',
      url: 'https://designrush.com',
      logo: 'https://framerusercontent.com/images/0EK4Pp3TFVllUk8JKPWHVMymT4.png?width=2128&height=380',
    },
  ];

  // Duplicate testimonials for seamless marquee loop
  get marqueeRowOne(): Testimonial[] {
    return [...this.testimonialRowOne, ...this.testimonialRowOne, ...this.testimonialRowOne];
  }

  get marqueeRowTwo(): Testimonial[] {
    return [...this.testimonialRowTwo, ...this.testimonialRowTwo, ...this.testimonialRowTwo];
  }

  marqueeOnePaused = false;
  marqueeTwoPaused = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.achievementsSection?.nativeElement) return;

      this.io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.animated) {
              this.startCounters();
              this.animated = true;
              this.io?.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      this.io.observe(this.achievementsSection.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private startCounters(): void {
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(now - startTime, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3);

      this.ngZone.run(() => {
        this.displayValues = this.stats.map((stat) => {
          const current = Math.floor(eased * stat.value);
          return current.toString();
        });
      });

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        this.ngZone.run(() => {
          this.displayValues = this.stats.map((s) => s.value.toString());
        });
      }
    };

    requestAnimationFrame(step);
  }

  pauseMarquee(row: number): void {
    if (row === 1) this.marqueeOnePaused = true;
    else this.marqueeTwoPaused = true;
  }

  resumeMarquee(row: number): void {
    if (row === 1) this.marqueeOnePaused = false;
    else this.marqueeTwoPaused = false;
  }
}

import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

type Stat = { label: string; value: number };
type ContinentRow = { continent: string; employed: number; pct: number };
type CompanyRow = { company: string; revenue: number };
type Role = { title: string; bullets: string[] };

@Component({
  selector: 'app-gcc',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './gcc.html',
  styleUrl: './gcc.css',
})
export class Gcc implements AfterViewInit, OnDestroy {
  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  crumbs = ['Home', 'GCC Talent Solutions'];

  hero = {
    title: 'Build and scale your Global Capability Center in India',
    kicker: 'Recruitment • Setup • Scale',
    img: 'assets/Success.jpg'
  };

  intro = {
    title: 'GCC recruitment done right',
    copy: [
      'GCCs deliver product engineering, analytics, finance and operations for global HQs. The edge comes from teams built fast and built right.',
      'We map skills, compensation and availability across Indian hubs, then run a repeatable hiring engine so your GCC grows predictably.'
    ],
    img: 'assets/data1.jpg'
  };

  stats: Stat[] = [
    { label: 'Total GCC companies in India', value: 1600 },
    { label: 'Total job openings in GCC – India', value: 1580 }
  ];

  continents: ContinentRow[] = [
    { continent: 'Asia and Australia', employed: 58608, pct: 27.7 },
    { continent: 'Africa', employed: 3433, pct: 1.62 },
    { continent: 'Europe', employed: 37820, pct: 17.87 },
    { continent: 'North America', employed: 108582, pct: 51.31 },
    { continent: 'South America', employed: 3175, pct: 1.5 }
  ];

  whatWeDo = {
    title: 'What we enable',
    img: 'assets/why.jpg',
    paras: [
      'Role design and demand planning with hiring velocity targets.',
      'Benchmarked comp bands and location strategy across tier-1 and tier-2 cities.',
      'Compliant onboarding, payroll coordination and first-90-days productivity plans.'
    ]
  };

  roles: Role[] = [
    { title: 'Software engineer', bullets: ['Microservices and cloud', 'Java • Node • Python • Go', 'SRE and platform'] },
    { title: 'Senior IT Engineer', bullets: ['Infra automation', 'IAM • Networking • Security', 'FinOps and observability'] },
    { title: 'Financial Analyst', bullets: ['FP&A and budgeting', 'Forecasting and variance', 'Rev-rec discipline'] },
    { title: 'Data Analyst', bullets: ['SQL • Python • BI', 'Experimentation', 'Stakeholder reporting'] },
    { title: 'Compliance Manager', bullets: ['SOX • GDPR • ISO 27001', 'Policy rollout', 'Risk and remediation'] },
    { title: 'Business Development', bullets: ['Account growth', 'Proposals and QBRs', 'Pipeline hygiene'] }
  ];

  companies: CompanyRow[] = [
    { company: 'TCS', revenue: 27.9 },
    { company: 'Infosys', revenue: 18.6 },
    { company: 'Wipro', revenue: 11.2 },
    { company: 'HCLTech', revenue: 13.3 },
    { company: 'Tech Mahindra', revenue: 6.6 }
  ];

  openIndex = 0;
  toggle(i: number) { this.openIndex = this.openIndex === i ? -1 : i; }

  private revealObs?: IntersectionObserver;
  private countObs?: IntersectionObserver;
  private rafIds: number[] = [];
  private detachScroll?: () => void;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      // Reveal-on-scroll
      this.revealObs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            el.classList.add('in');
            this.revealObs?.unobserve(el);
          });
        },
        { threshold: 0.15 }
      );
      this.qsa('.reveal').forEach(el => this.revealObs!.observe(el));

      // Count-up numbers (TS4111-safe: never touch dataset.count)
      this.countObs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const raw = el.getAttribute('data-count') ?? '0';
            const target = parseInt(raw, 10) || 0;
            this.animateCount(el, target);
            this.countObs?.unobserve(el);
          });
        },
        { threshold: 0.6 }
      );
      this.qsa('[data-count]').forEach(el => this.countObs!.observe(el));

      // Parallax on hero image
      const hero = this.host.nativeElement.querySelector('.hero') as HTMLElement;
      const onScroll = () => {
        hero.style.setProperty('--parallax', String((window.scrollY || 0) * 0.15));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.detachScroll = () => window.removeEventListener('scroll', onScroll);
    });
  }

  ngOnDestroy(): void {
    this.revealObs?.disconnect();
    this.countObs?.disconnect();
    this.rafIds.forEach(id => cancelAnimationFrame(id));
    this.detachScroll?.();
  }

  private qsa(sel: string): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll(sel)) as HTMLElement[];
    }

  private animateCount(el: HTMLElement, target: number) {
    const DUR = 900;
    const start = performance.now();
    const from = 0;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(from + (target - from) * eased);
      el.textContent = val.toLocaleString();
      if (p < 1) this.rafIds.push(requestAnimationFrame(step));
    };
    this.rafIds.push(requestAnimationFrame(step));
  }
}


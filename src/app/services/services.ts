import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

type IconName = 'users' | 'code' | 'globe' | 'award' | 'briefcase' | 'target';
type IconVariant = 'orange' | 'blue' | 'green' | 'purple' | 'amber' | 'red';

type ServiceCard = {
  title: string;
  subtitle: string;
  desc: string;
  icon: IconName;
  iconVariant: IconVariant;
  points: string[];
};
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimateDirective],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})
export class Services {
  services: ServiceCard[] = [
    {
      title: 'Talent Solutions',
      subtitle: 'AI-Driven Recruitment Platform',
      desc: 'Our comprehensive talent platform handles sourcing, screening, onboarding, and continuous engagement. We leverage AI and data analytics to find the perfect match for your organization.',
      icon: 'users',
      iconVariant: 'orange',
      points: [
        'AI-Powered Candidate Matching',
        'Automated Screening Process',
        'Seamless Onboarding',
        'Employee Engagement Tools'
      ]
    },
    {
      title: 'Technology Consulting',
      subtitle: 'Digital Transformation Excellence',
      desc: 'We assist companies in modernizing their systems, improving productivity, and embracing automation. Our experts bring cutting-edge solutions to your business challenges.',
      icon: 'code',
      iconVariant: 'blue',
      points: [
        'System Modernization',
        'Cloud Migration',
        'Process Automation',
        'DevOps Implementation'
      ]
    },
    {
      title: 'GCC Setup & Operations',
      subtitle: 'Global Capability Centers',
      desc: 'End-to-end support for establishing and operating your Global Capability Center. From location strategy to talent acquisition, we handle it all.',
      icon: 'globe',
      iconVariant: 'green',
      points: [
        'Location Strategy',
        'Infrastructure Setup',
        'Talent Acquisition',
        'Operations Management'
      ]
    },
    {
      title: 'Learning & Development',
      subtitle: 'Building Future-Ready Teams',
      desc: 'Through training programs and strategic partnerships, we prepare professionals for the evolving tech landscape, ensuring your team stays ahead of the curve.',
      icon: 'award',
      iconVariant: 'purple',
      points: [
        'Technical Training',
        'Leadership Programs',
        'Certification Courses',
        'Custom Workshops'
      ]
    },
    {
      title: 'Staffing & Recruitment',
      subtitle: 'Right Talent, Right Opportunities',
      desc: 'From IT specialists to leadership roles, we connect the right talent with the right opportunities. Our deep network ensures quality placements every time.',
      icon: 'briefcase',
      iconVariant: 'amber',
      points: [
        'Contract Staffing',
        'Permanent Placement',
        'Executive Search',
        'Volume Hiring'
      ]
    },
    {
      title: 'Project Delivery',
      subtitle: 'End-to-End Project Excellence',
      desc: 'Dedicated teams for complete project delivery. We bring the expertise, resources, and management to ensure your projects succeed on time and within budget.',
      icon: 'target',
      iconVariant: 'red',
      points: [
        'Dedicated Teams',
        'Agile Methodology',
        'Quality Assurance',
        'Timeline Management'
      ]
    }
  ];
}

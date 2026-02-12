import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  focusAreas: string[];
  bio: string;
}

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaders.html',
  styleUrl: './leaders.css'
})
export class Leaders {
  teamMembers: TeamMember[] = [
    {
      id: 'bala',
      name: 'Bala M',
      role: 'Founder & Director',
      photo: '/assets/arjun.png',
      focusAreas: ['Contract staffing', 'Leadership', 'Upskilling'],
      bio: `Bala has over 20 years of IT industry experience in contract staffing and corporate hiring. Before founding UniqueHire, he worked with ATTRA, iGATE, and IBM, gaining strong expertise in recruitment and leadership. He is passionate about bridging the IT skill gap through tailored upskilling from vanilla to niche technologies. Under his leadership, UniqueHire grew from 4 members to 500 employees in just three years, evolving into an IT services firm. He focuses on driving best practices, solving business challenges, and fostering growth across teams. Outside work, Bala enjoys off-road drives, temple visits, badminton, and family time.`
    },
    {
      id: 'vamshi',
      name: 'Vamshi Krishna',
      role: 'Co-Founder & Director',
      photo: '/assets/team/prabhu.jpg',
      focusAreas: ['IT consulting', 'Operational excellence', 'Investment strategy'],
      bio: `Vamshi's strong background in IT consulting and leadership has been key to shaping UniqueHire's strategic growth and operational excellence. With deep expertise across technology and management, he provides critical insights into emerging trends and innovations. His analytical approach and tailored IT solutions have helped UniqueHire stay ahead of the competition. By streamlining processes, he has driven greater efficiency, delivery quality, and client satisfaction. Vamshi also played a vital role in attracting major investments, strengthening UniqueHire's financial foundation. His strategic foresight continues to fuel expansion into new markets and advanced technologies.`
    },
    {
      id: 'prabhu',
      name: 'Prabhu',
      role: 'Co-Founder & Director',
      photo: '/assets/team/rajesh.jpg',
      focusAreas: ['Client engagement', 'Team building', 'P&L management'],
      bio: `Prabhu has been a key force in establishing the company as a leading IT consulting and services firm. With over 22 years of experience, he has worked with reputed staffing companies like OneApps, Klaus IT, VLS, and TQuanta Technologies. A results-driven and self-motivated leader, he excels in building strong teams that drive profitability and efficiency. He is highly skilled in client engagement, understanding business challenges, and delivering tailored staffing solutions. Prabhu holds a B.Tech in Electrical and Electronics Engineering from Bangalore University and is passionate about recruitment, client relations, operations, and P&L management.`
    },
    {
      id: 'rajesh',
      name: 'Rajesh Kaidam',
      role: 'Co-Founder & Director',
      photo: '/assets/team/debangshu.jpg',
      focusAreas: ['Global hiring', 'Digital recruitment', 'Talent strategy'],
      bio: `Rajesh Kaidam is a result-oriented recruitment leader with over 15 years of experience in IT services, product development, staffing, and start-up hiring. He specializes in strategizing and driving talent acquisition across global markets including North America, Europe, and APAC. Rajesh has played a key role in establishing and scaling contracting functions across geographies, earning recognition from clients and stakeholders. He believes that quality and turnaround time are crucial to successful recruitment. His passions include talent transformation, digital recruitment, HR innovation, and start-up operations. Outside work, he enjoys traveling with family, supporting orphanages, and maintaining work-life balance.`
    },
    {
      id: 'natarajan',
      name: 'Natarajan P',
      role: 'Vice President - Operations',
      photo: '/assets/team/devasenapathi.jpg',
      focusAreas: ['P&L ownership', 'Process improvement', 'Client success'],
      bio: `Natarajan oversees UniqueHire's staffing business, managing P&L, go-to-market strategy, operations, client relationships, and delivery. With extensive experience in the staffing services industry, he previously held senior roles at Nityo Infotech and Adecco India. His focus on client success and continuous improvement has been a key driver of organizational growth. Natarajan constantly seeks to infuse innovation, quality, and leadership into every aspect of business operations. Passionate about the staffing domain, he thrives on creating technology-driven, time-saving solutions that make real impact. He holds a Bachelor's degree in Information Systems from BITS - Pilani.`
    }
  ];

  activeMemberId: string = this.teamMembers[0]?.id ?? '';

  get activeMember(): TeamMember | undefined {
    return this.teamMembers.find(m => m.id === this.activeMemberId);
  }

  selectMember(id: string): void {
    this.activeMemberId = id;
  }
}

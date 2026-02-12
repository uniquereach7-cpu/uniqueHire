import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

type Place = { name: string; address: string };

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollAnimateDirective],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  @Input() heroImage = 'assets/contact-hero.jpg';
  @Input() bgBelow = '#ffffff';

  // EmailJS config
  emailServiceId = 'YOUR_EMAILJS_SERVICE_ID';
  emailTemplateId = 'YOUR_EMAILJS_TEMPLATE_ID';
  emailPublicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

  formModel = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: ''
  };

  sending = false;
  success = '';
  error = '';

  services: string[] = [
    'Staffing & Recruitment',
    'IT Consulting',
    'Managed Services',
    'Talent Solutions',
    'Other'
  ];

  places: Place[] = [
    {
      name: 'Hyderabad',
      address:
        'Unit no. 5A,11th floor, Tower 2, Vamsiram Jyothi Granules, Sy No. 199, Kondapur, Serilingampally, Hyderabad, Telangana, India-500084'
    },
    {
      name: 'Bangalore',
      address:
        '#18, 3rd Floor, Gamma Block, Sigma Soft Tech Park, Whitefield, Bangalore – 560066.'
    },
    {
      name: 'Australia',
      address: '15 Dromana Way, Truganina, Victoria, Australia – 3029.'
    },
    {
      name: 'Canada',
      address: '30 Ryler Way, Markham, ON, Canada – L3S0E7.'
    }
  ];

  constructor() {
    if (this.emailPublicKey && this.emailPublicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      try {
        emailjs.init(this.emailPublicKey);
      } catch {}
    }
  }

  async onSubmit(f: NgForm) {
    this.success = '';
    this.error = '';

    if (!f || f.invalid) {
      f?.control?.markAllAsTouched();
      return;
    }

    const templateParams = {
      from_name: this.formModel.name,
      from_email: this.formModel.email,
      phone: this.formModel.phone,
      subject: this.formModel.subject,
      service_choice: this.formModel.service,
      message: this.formModel.message || '(no message provided)'
    };

    this.sending = true;

    try {
      await emailjs.send(
        this.emailServiceId,
        this.emailTemplateId,
        templateParams,
        this.emailPublicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' ? this.emailPublicKey : undefined
      );

      this.success = 'Message sent successfully — we will contact you shortly.';
      f.resetForm();
      this.formModel = { name: '', email: '', phone: '', subject: '', service: '', message: '' };
    } catch (err) {
      console.error('EmailJS send error', err);
      this.error = 'Failed to send message. Please try again later.';
    } finally {
      this.sending = false;
      if (this.success) setTimeout(() => (this.success = ''), 6000);
    }
  }
}

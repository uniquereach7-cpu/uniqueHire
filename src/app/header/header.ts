import { Component, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements AfterViewInit, OnDestroy { 
  menuOpen = false;
  scrolled = true;
  isHome = false;
  private sub?: Subscription;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = (e.urlAfterRedirects || e.url || '').split('?')[0];
        this.isHome = url === '/' || url === '/home';
        this.updateHeaderState();
      });

    const url = (this.router.url || '').split('?')[0];
    this.isHome = url === '/' || url === '/home';
    this.updateHeaderState();
  }

  @HostListener('window:scroll')
  onScroll() { 
    this.updateHeaderState(); 
  }

  private updateHeaderState() {
    if (!this.isHome) { 
      this.scrolled = true; 
      return; 
    }
    this.scrolled = (window.scrollY || 0) > 80;
  }

  toggleMenu() { 
    this.menuOpen = !this.menuOpen; 
  }

  closeMenu() { 
    this.menuOpen = false; 
  }

  ngOnDestroy() { 
    this.sub?.unsubscribe(); 
  }
}

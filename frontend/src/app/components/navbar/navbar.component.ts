import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
    private listTitles: { path: string; title: string }[] = [];
    private toggleButton: Element | null = null;
    private sidebarVisible = false;

    constructor(
      private location: Location,
      private element: ElementRef,
      private router: Router
    ) {}

    ngOnInit() {
      this.listTitles = ROUTES;
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe(() => {
        this.sidebarClose();
        const layer = document.getElementsByClassName('close-layer')[0];
        if (layer) {
          layer.remove();
        }
      });
    }

    sidebarOpen() {
        const body = document.body;
        setTimeout(() => {
            this.toggleButton?.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }

    sidebarClose() {
        const body = document.body;
        this.toggleButton?.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }

    sidebarToggle() {
        if (!this.sidebarVisible) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle() {
      let title = this.location.prepareExternalUrl(this.location.path());
      if (title.charAt(0) === '#') {
          title = title.slice(1);
      }
      const found = this.listTitles.find(item => item.path === title);
      return found?.title ?? 'Dashboard';
    }
}

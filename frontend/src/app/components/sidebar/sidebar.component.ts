import { Component, OnInit } from '@angular/core';

interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/Panel', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/productos', title: 'Gestionar Productos', icon: 'content_paste', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];

  ngOnInit() {
    this.menuItems = ROUTES;
  }
}

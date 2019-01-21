import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: ChildrenItems[];
}
export interface ChildrenItems {
    path: string;
    title: string;
    icon?: string;
  }
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/admin/table-list', title: 'Administration',  icon:'content_paste', class: '' },
    { path: '/admin/project', title: 'Projects',  icon:'Projects', class: '' },
    { path: '/admin/typography', title: 'Projects Manager',  icon:'library_books', class: '',
     children: [
            {
                path: 'station_management',
                title: 'Station Management',
                icon: 'parent'
            }
        ] },
    { path: '/admin/Companydetails', title: 'Company',  icon:'description', class: '' },
    { path: '/admin/icons', title: 'Task Manager',  icon:'bubble_chart', class: '' },
    { path: '/admin/maps', title: 'Hierarchy Controller',  icon:'location_on', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

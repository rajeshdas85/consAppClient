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
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Administration',  icon:'content_paste', class: '' },
    { path: '/Projects', title: 'Projects',  icon:'Projects', class: '' },
    { path: '/typography', title: 'Projects Manager',  icon:'library_books', class: '',
     children: [
            {
                path: 'station_management',
                title: 'Station Management',
                icon: 'parent'
            }
        ] },
    { path: '/Companydetails', title: 'Company',  icon:'description', class: '' },
    { path: '/icons', title: 'Task Manager',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Hierarchy Controller',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
   
   

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

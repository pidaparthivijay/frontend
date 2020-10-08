import { Component, OnInit, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LookupManagementComponent } from './lookup-management/lookup-management.component';
@Component({
  selector: 'app-adm-home',
  templateUrl: './adm-home.component.html',
  styleUrls: ['./adm-home.component.scss']
})
export class AdmHomeComponent implements OnInit {

  empName: string;
  items: MenuItem[];
  @ViewChildren(LookupManagementComponent) lookupCom: LookupManagementComponent;
  constructor() { }

  ngOnInit() {
    this.empName = sessionStorage.getItem('name');
    this.items = [
      {
        label: 'Lookups',
        icon: 'pi pi-fw pi-file',
        title: 'Manage the Look ups that appear',
        routerLink: 'lookupManagement'
      },
      {
        label: 'Employees',
        icon: 'pi pi-fw pi-id-card',
        title: 'View & Add Employees',
        routerLink: 'employeeManagement'
      },
      {
        label: 'Amenities',
        icon: 'pi pi-fw pi-th-large',
        title: 'Add,View,Edit,Delete Amenities',
        routerLink: 'amenity'
      },
      {
        label: 'Tour Packages',
        icon: 'pi pi-fw pi-briefcase',
        title: 'Add,View,Edit,Delete Tour Packages',
        routerLink: 'tourPackage'
      },
      {
        label: 'Room Allocation',
        icon: 'pi pi-fw pi-home',
        title: 'View Requests & Allocate Rooms',
        routerLink: 'roomAllocate'
      },
      {
        label: 'Rooms',
        icon: 'pi pi-fw pi-sitemap',
        title: 'Manage Rooms',
        routerLink: 'roomManagement'
      },
      {
        label: this.empName,
        title: 'View ' + this.empName + '\'s Menu',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Logout',
            title: 'Logout',
            routerLink: '/logout',
            icon: 'pi pi-fw pi-power-off'
          }
        ]
      },
    ];
  }

}

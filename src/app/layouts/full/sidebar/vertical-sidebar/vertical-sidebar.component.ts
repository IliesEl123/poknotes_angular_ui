import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: [],
})
export class VerticalSidebarComponent implements OnInit {
  navItems = navItems;
  constructor(public navService: NavService) {}
  ngOnInit(): void {}
}

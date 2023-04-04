import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Messages } from '../../data/messages';
import { Notifications } from '../../data/notification'
import { Profile } from '../../data/profile';

@Component({
  selector: 'app-horizontal-header',
  templateUrl: './horizontal-header.component.html',
  styleUrls: []
})
export class HorizontalHeaderComponent implements OnInit {

  @Input() sidebartoggle: MatSidenav | any;

  public showSearch = false;
  public notifications: any[] = Notifications;
  public messages: any[] = Messages;
  public profiles: any[] = Profile;

  constructor() { }

  ngOnInit(): void {
  }

}

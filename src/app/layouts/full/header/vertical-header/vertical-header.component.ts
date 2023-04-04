import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Messages } from '../../data/messages';
import { Notifications } from '../../data/notification';
import { Profile } from '../../data/profile';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-vertical-header',
  templateUrl: './vertical-header.component.html',
  styleUrls: [],
})
export class VerticalHeaderComponent implements OnInit {
  currentUser: any;

  @Input() sidebartoggle: MatSidenav | any;

  public showSearch = false;
  public notifications: any[] = Notifications;
  public messages: any[] = Messages;
  public profiles: any[] = Profile;

  constructor(
    private router: Router,
    public myapp: AppComponent,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onClick(page: string): void {
    this.router.navigate(['/dashboard/' + page]);
  }

  logout(): void {
    this.token.signOut();
  }
}

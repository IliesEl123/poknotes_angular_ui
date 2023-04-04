import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeatherModule } from 'angular-feather';

/**Components**/
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { VerticalHeaderComponent } from './layouts/full/header/vertical-header/vertical-header.component';
import { HorizontalHeaderComponent } from './layouts/full/header/horizontal-header/horizontal-header.component';
import { VerticalSidebarComponent } from './layouts/full/sidebar/vertical-sidebar/vertical-sidebar.component';
import { Hnavbar } from './layouts/full/sidebar/horizontal-sidebar/navbar/hnavbar.component';
import { MenuListItemComponent } from './layouts/full/sidebar/vertical-sidebar/menu-list-item/menu-list-item.component';
import { HorizontalSidebarComponent } from './layouts/full/sidebar/horizontal-sidebar/horizontal-sidebar.component';
import { CustomizerComponent } from './layouts/full/customizer/customizer.component';
import { allIcons } from 'angular-feather/icons';
import { LogoComponent } from './layouts/full/logo/logo.component';
//import { NavService } from './services/nav.service';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';

import { MatDialogModule } from '@angular/material/dialog';

import { FilterPipe } from './features/dashboard/filter.pipe';
import { ProfileComponent } from './features/profile/profile.component';
import {
  DashboardComponent,
  DialogContentComponent,
} from './features/dashboard/dashboard.component';
import { CustomizerService } from './core/services/customizer.service';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    VerticalHeaderComponent,
    HorizontalHeaderComponent,
    VerticalSidebarComponent,
    Hnavbar,
    MenuListItemComponent,
    HorizontalSidebarComponent,
    CustomizerComponent,
    LogoComponent,
    ProfileComponent,
    DashboardComponent,
    DialogContentComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    FeatherModule.pick(allIcons),
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [CustomizerService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

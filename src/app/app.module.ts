import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './service/auth.guard';
import {AuthInterceptorService} from './service/auth-interceptor.service';
import { OrderMeniuComponent } from './order-meniu/order-meniu.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'main', component: MainNavComponent, children: [
      {path: '', component: RestaurantMenuComponent},
      {path: 'profile', component: MyProfileComponent},
      {path: 'order', component: OrderMeniuComponent}
    ], canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MyProfileComponent,
    RestaurantMenuComponent,
    LoginPageComponent,
    OrderMeniuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {FirebaseLoginComponent} from './firebase-login/firebase-login.component';

import config from './Configs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdListModule, MdProgressSpinnerModule,
  MdSelectModule,
  MdTabsModule,
  MdRadioModule,
  MdToolbarModule,
  MdSliderModule,
  MdSlideToggleModule, MdSidenavModule, MdDialogModule
} from '@angular/material';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ListItemComponent} from './list-item/list-item.component';
import {ListItemDayComponent} from './list-item-day/list-item-day.component';
import {CreateitemComponent} from './createitem/createitem.component';
import {LogoutComponent} from './logout/logout.component';
import {ResetPasswordDialogComponent} from './reset-password-dialog/reset-password-dialog.component';
import {SignoutDialogComponent} from './signout-dialog/signout-dialog.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ResetPasswordCompleteComponent} from './reset-password-complete/reset-password-complete.component';
export const firebaseConfig = config.firebase;

const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'list-item', component: ListItemComponent},
  {path: 'fb', component: FirebaseLoginComponent},
  {path: 'createitem', component: CreateitemComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    FirebaseLoginComponent,
    SignUpComponent,
    ListItemComponent,
    ListItemDayComponent,
    CreateitemComponent,
    LogoutComponent,
    CreateitemComponent,
    ResetPasswordDialogComponent,
    SignoutDialogComponent,
    ResetPasswordComponent,
    ResetPasswordCompleteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdIconModule,
    MdRadioModule,
    MdSliderModule,
    MdProgressSpinnerModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ResetPasswordDialogComponent,
    SignoutDialogComponent
  ]
})
export class AppModule {
}

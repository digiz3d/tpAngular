import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AccountListComponent } from './account-list/account-list.component';

import { AppRoutingModule }     from './app-routing.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    AccountListComponent,
    AccountDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // so we can communicate with the REST api server
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

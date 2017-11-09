import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddAccountComponent } from './add-account/add-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'account-list', component: AccountListComponent },
  { path: 'account-detail/:id', component: AccountDetailComponent },
  { path: 'create-account', component : AddAccountComponent },
  { path: '**',     component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

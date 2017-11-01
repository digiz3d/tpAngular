import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormulaireComponent } from './formulaire/formulaire.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: FormulaireComponent },
  { path: '**',     component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CompanyInfoComponent} from './components/company-info/company-info.component';
import {ComplianceComponent} from './components/compliance/compliance.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ComplianceHistoryComponent} from './components/compliance-history/compliance-history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company-info', component: CompanyInfoComponent },
  { path: 'compliance', component: ComplianceComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'compliance-history', component: ComplianceHistoryComponent },
  { path: '**', component: NotFoundComponent }
];

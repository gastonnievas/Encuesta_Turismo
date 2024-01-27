import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';;
import { AuthGuard } from './utils/auth.guard';
import { FormComponent } from './pages/form/form.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { HomeComponent } from './pages/home/home.component'; 
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'contacto', component: ContactComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

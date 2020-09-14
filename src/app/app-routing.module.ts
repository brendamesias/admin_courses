import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiderComponent } from './sider/sider.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home', component: SiderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'security',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }

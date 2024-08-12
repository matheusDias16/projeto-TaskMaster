import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicMainLayoutComponent } from './public-main-layout/public-main-layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicMainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}

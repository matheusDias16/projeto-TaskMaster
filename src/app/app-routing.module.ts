import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/public/not-found/not-found.component';
import { appGuard } from './guards/app.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
    canActivate: [appGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateMainLayoutComponent } from './private-main-layout/private-main-layout.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { ProjectAreaComponent } from './project-area/project-area.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateMainLayoutComponent,
    children: [
      {
        path: 'user',
        component: UserAreaComponent
      },

      {
        path: 'project-area/:id',
        component: ProjectAreaComponent
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

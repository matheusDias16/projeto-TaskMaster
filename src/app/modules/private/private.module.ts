import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateMainLayoutComponent } from './private-main-layout/private-main-layout.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { SharedModule } from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ProjectAreaComponent } from './project-area/project-area.component';
import { CdkDrag,CdkDropList, CdkDropListGroup,} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrivateMainLayoutComponent,
    UserAreaComponent,
    ProjectAreaComponent,
  ],
  imports: [
    CommonModule, PrivateRoutingModule, SharedModule,
    MatButtonModule,MatTableModule,
    CdkDropList, CdkDrag, CdkDropListGroup, FormsModule]
})
export class PrivateModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTreeComponent } from './projects-tree.component';
import { PersonAvatarModule } from '../person-avatar/person-avatar.module';

@NgModule({
  declarations: [
    ProjectsTreeComponent,
  ],
  exports: [
    ProjectsTreeComponent,
  ],
  imports: [
    CommonModule,
    PersonAvatarModule,
  ],
})
export class ProjectsTreeModule { }

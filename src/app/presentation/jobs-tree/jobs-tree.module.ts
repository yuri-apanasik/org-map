import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsTreeComponent } from './jobs-tree.component';
import { ProjectsTreeModule } from '../projects-tree/projects-tree.module';
import { PersonAvatarModule } from '../person-avatar/person-avatar.module';

@NgModule({
  declarations: [
    JobsTreeComponent,
  ],
  exports: [
    JobsTreeComponent,
  ],
  imports: [
    CommonModule,
    ProjectsTreeModule,
    PersonAvatarModule,
  ],
})
export class JobsTreeModule { }

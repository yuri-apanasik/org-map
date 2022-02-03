import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgTreeComponent } from './org-tree.component';
import { ProjectsTreeModule } from '../projects-tree/projects-tree.module';
import { JobsTreeModule } from '../jobs-tree/jobs-tree.module';

@NgModule({
  declarations: [
    OrgTreeComponent,
  ],
  imports: [
    CommonModule,
    ProjectsTreeModule,
    JobsTreeModule,
  ],
  exports: [
    OrgTreeComponent,
  ],
})
export class OrgTreeModule { }

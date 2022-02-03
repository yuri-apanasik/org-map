import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JobsTreeModule } from './presentation/jobs-tree/jobs-tree.module';
import { ProjectsTreeModule } from './presentation/projects-tree/projects-tree.module';
import { PersonsListModule } from './presentation/persons-list/persons-list.module';
import { OrgTreeModule } from './presentation/org-tree/org-tree.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JobsTreeModule,
    ProjectsTreeModule,
    PersonsListModule,
    OrgTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

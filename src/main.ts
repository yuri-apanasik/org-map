import { enableProdMode, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { JOBS_TREE, JOBS_TREE_DEPTH, JOBS_TREE_HEADER_HEIGHT, STATIC_JOBS_TREE } from './app/data/jobs-tree';
import { PROJECTS_TREE, PROJECTS_TREE_DEPTH, PROJECTS_TREE_HEADER_HEIGHT, STATIC_PROJECTS_TREE } from './app/data/projects-tree';
import { getTreeDepth, processNodePaths } from './app/logic/utils/org-tree.utils';
import { JOB_RESPONSIBILITIES, STATIC_JOB_RESPONSIBILITIES } from './app/data/job-responsibilities';
import { PERSONS, STATIC_PERSONS } from './app/data/persons';
import { JOB_ASSIGNMENTS, STATIC_JOB_ASSIGNMENTS } from './app/data/job-assignments';
import { ASSIGNMENTS_VISIBILITY, HIGHLIGHTED_PERSONS, RESPONSIBILITIES_VISIBILITY, SELECTED_PERSONS, SelectedPersons } from './app/logic/selected-persons';
import { PROJECT_RESPONSIBILITIES, STATIC_PROJECT_RESPONSIBILITIES } from './app/data/project-responsibilities';
import { BehaviorSubject } from 'rxjs';

if (environment.production) {
  enableProdMode();
}

Promise.resolve({
  jobsTree: STATIC_JOBS_TREE,
  jobResponsibilities: STATIC_JOB_RESPONSIBILITIES,
  jobAssignments: STATIC_JOB_ASSIGNMENTS,
  projectsTree: STATIC_PROJECTS_TREE,
  projectResponsibilities: STATIC_PROJECT_RESPONSIBILITIES,
  persons: STATIC_PERSONS,
}).then(data => {
  platformBrowserDynamic([
    { provide: JOBS_TREE, useValue: processNodePaths(data.jobsTree) },
    { provide: JOBS_TREE_DEPTH, useValue: getTreeDepth(data.jobsTree) },
    { provide: JOBS_TREE_HEADER_HEIGHT, useValue: 50 },
    { provide: JOB_RESPONSIBILITIES, useValue: data.jobResponsibilities },
    { provide: JOB_ASSIGNMENTS, useValue: data.jobAssignments },
    { provide: PROJECTS_TREE, useValue: processNodePaths(data.projectsTree) },
    { provide: PROJECTS_TREE_DEPTH, useValue: getTreeDepth(data.projectsTree) },
    { provide: PROJECTS_TREE_HEADER_HEIGHT, useValue: 50 },
    { provide: PROJECT_RESPONSIBILITIES, useValue: data.projectResponsibilities },
    { provide: PERSONS, useValue: data.persons.sort((a, b) => a.name < b.name ? -1 : 1) },
    {
      provide: SELECTED_PERSONS,
      useFactory: () => {
        const persons = inject(PERSONS);
        return new SelectedPersons(persons.map(t => t.id));
      },
    },
    {
      provide: HIGHLIGHTED_PERSONS,
      useFactory: () => {
        const persons = inject(PERSONS);
        return new SelectedPersons(persons.map(t => t.id));
      },
    },
    { provide: RESPONSIBILITIES_VISIBILITY, useValue: new BehaviorSubject<boolean>(true) },
    { provide: ASSIGNMENTS_VISIBILITY, useValue: new BehaviorSubject<boolean>(true) },
  ]).bootstrapModule(AppModule)
    .catch(err => console.error(err));
});

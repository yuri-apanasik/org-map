import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { JOBS_TREE, JOBS_TREE_DEPTH, JOBS_TREE_HEADER_HEIGHT } from '../../data/jobs-tree';
import { OrgTreeNode } from '../../models/org-tree-node';
import { PROJECTS_TREE } from '../../data/projects-tree';
import { CEO_PERSON } from '../../data/persons';
import { ASSIGNMENTS_VISIBILITY, RESPONSIBILITIES_VISIBILITY } from '../../logic/selected-persons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'om-org-tree',
  templateUrl: './org-tree.component.html',
  styles: [
  ]
})
export class OrgTreeComponent {
  @HostBinding('class') hostClass = 'flex flex-auto pt-3 pr-3 overflow-auto gap-2';

  jobsHeaderHeight: number | undefined;
  projectsHeaderWidth = 250;

  ceo = CEO_PERSON;

  constructor(
    @Inject(JOBS_TREE) readonly jobsTree: OrgTreeNode[],
    @Inject(JOBS_TREE_DEPTH) jobsTreeDepth: number,
    @Inject(JOBS_TREE_HEADER_HEIGHT) jobsTreeHeaderHeight: number,
    @Inject(PROJECTS_TREE) readonly projectsTree: OrgTreeNode[],
    @Inject(RESPONSIBILITIES_VISIBILITY) readonly responsibilitiesVisibility: BehaviorSubject<boolean>,
    @Inject(ASSIGNMENTS_VISIBILITY) readonly assignmentsVisibility: BehaviorSubject<boolean>,
  ) {
    this.jobsHeaderHeight = (jobsTreeHeaderHeight + 1) * (jobsTreeDepth + 1);
  }

  setResponsibilitiesVisibility(val: boolean): void {
    this.responsibilitiesVisibility.next(val);
  }

  setAssignmentsVisibility(val: boolean): void {
    this.assignmentsVisibility.next(val);
  }
}

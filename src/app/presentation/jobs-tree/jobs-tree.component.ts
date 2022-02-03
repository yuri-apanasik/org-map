import { Component, HostBinding, Inject, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { OrgTreeNode } from '../../models/org-tree-node';
import { PROJECTS_TREE } from '../../data/projects-tree';
import { JOBS_TREE_DEPTH, JOBS_TREE_HEADER_HEIGHT } from '../../data/jobs-tree';
import { JOB_RESPONSIBILITIES } from '../../data/job-responsibilities';
import { OrgTreeAssignment } from '../../models/org-tree-assignment';
import { Person } from '../../models/person';
import { PERSONS } from '../../data/persons';
import { getPersonsBorderImage } from '../utils/assignment-styles.utils';
import { HIGHLIGHTED_PERSONS, RESPONSIBILITIES_VISIBILITY, SELECTED_PERSONS } from '../../logic/selected-persons';
import { combineLatest, Observable, Subject, takeUntil, tap } from 'rxjs';

const BASE_HOST_CLASS = 'flex flex-col pb-2 flex-auto border relative';

@Component({
  selector: 'om-jobs-tree',
  templateUrl: './jobs-tree.component.html',
  styles: [
  ]
})
export class JobsTreeComponent implements OnDestroy {
  @Input() jobNode: OrgTreeNode | undefined;
  @Input() level = 0;

  @HostBinding('class') hostClass = '';
  @HostBinding('style.border-image') hostBorderImage: string | undefined;
  headerHeight: number | undefined;
  isLeaf: boolean | undefined;

  jobResponsiblePersons: Person[] = [];
  private selectedPersonIds: Person['id'][] = [];
  private highlightedPersonIds: Person['id'][] = [];
  private responsibilitiesVisible: boolean = false;

  private readonly destroySubject = new Subject<void>();

  constructor(
    @Inject(JOBS_TREE_DEPTH) readonly jobsTreeDepth: number,
    @Inject(JOBS_TREE_HEADER_HEIGHT) private readonly jobsTreeHeaderHeight: number,
    @Inject(JOB_RESPONSIBILITIES) private readonly jobResponsibilities: OrgTreeAssignment[],
    @Inject(PROJECTS_TREE) readonly projectsTree: OrgTreeNode[],
    @Inject(PERSONS) private readonly persons: Person[],
    @Inject(SELECTED_PERSONS) selectedPersons: Observable<Person['id'][]>,
    @Inject(HIGHLIGHTED_PERSONS) highlightedPersons: Observable<Person['id'][]>,
    @Inject(RESPONSIBILITIES_VISIBILITY) readonly responsibilitiesVisibility: Observable<boolean>,
  ) {
    combineLatest([
      selectedPersons,
      highlightedPersons,
      responsibilitiesVisibility,
    ]).pipe(
      tap(([sp, hp, rv]) => {
        this.selectedPersonIds = sp;
        this.highlightedPersonIds = hp;
        this.responsibilitiesVisible = rv;
        this.refresh();
      }),
      takeUntil(this.destroySubject),
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobNode']) { this.refresh(); }
  }

  private refresh(): void {
    this.refreshAssignments();
    this.refreshHostAppearance();
  }

  private refreshAssignments(): void {
    this.jobResponsiblePersons = this.responsibilitiesVisible
      ? this.persons
        .filter(p => this.jobResponsibilities.some(r => r.personId === p.id && r.sourceNodeIds.includes(this.jobNode?.id ?? '') && !r.targetNodeIds.length))
        .filter(p => this.selectedPersonIds.includes(p.id))
      : [];
  }

  private refreshHostAppearance(): void {
    this.isLeaf = !this.jobNode?.nodes?.length;

    this.hostClass = `${BASE_HOST_CLASS} `;

    const missingDepth = this.isLeaf ? this.jobsTreeDepth - this.level : 0;
    this.headerHeight = this.jobsTreeHeaderHeight + (this.jobsTreeHeaderHeight + 1) * missingDepth;

    this.hostBorderImage = getPersonsBorderImage(this.jobResponsiblePersons.filter(p => this.highlightedPersonIds.includes(p.id)));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

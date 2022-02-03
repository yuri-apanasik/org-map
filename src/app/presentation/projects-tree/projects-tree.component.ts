import { Component, HostBinding, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OrgTreeNode } from '../../models/org-tree-node';
import { PROJECTS_TREE_HEADER_HEIGHT } from '../../data/projects-tree';
import { Person } from '../../models/person';
import { PERSONS } from '../../data/persons';
import { JOB_RESPONSIBILITIES } from '../../data/job-responsibilities';
import { OrgTreeAssignment } from '../../models/org-tree-assignment';
import { getPersonsBorderImage } from '../utils/assignment-styles.utils';
import { JOB_ASSIGNMENTS } from '../../data/job-assignments';
import { ASSIGNMENTS_VISIBILITY, HIGHLIGHTED_PERSONS, RESPONSIBILITIES_VISIBILITY, SELECTED_PERSONS } from '../../logic/selected-persons';
import { Observable, Subject, takeUntil, tap, combineLatest } from 'rxjs';
import { PROJECT_RESPONSIBILITIES } from '../../data/project-responsibilities';

const BASE_HOST_CLASS = 'flex border gap-2 relative';

@Component({
  selector: 'om-projects-tree',
  templateUrl: './projects-tree.component.html',
  styles: [
  ]
})
export class ProjectsTreeComponent implements OnChanges, OnDestroy {
  @Input() jobNode: OrgTreeNode | undefined;
  @Input() projectNode: OrgTreeNode | undefined;
  @Input() level = 0;
  @Input() mode: 'HEADER' | 'BODY' | undefined;

  @HostBinding('class') hostClass = '';
  @HostBinding('style.height.px') hostHeight: number | undefined;
  @HostBinding('style.max-height.px') hostMaxHeight: number | undefined;
  @HostBinding('style.border-image') hostBorderImage: string | undefined;
  isLeaf: boolean | undefined;

  projectResponsiblePersons: Person[] = [];
  jobResponsiblePersons: Person[] = [];
  jobAssignedPersons: Person[] = [];
  private selectedPersonIds: Person['id'][] = [];
  private highlightedPersonIds: Person['id'][] = [];
  private responsibilitiesVisible: boolean = false;
  private assignmentsVisible: boolean = false;

  private readonly destroySubject = new Subject<void>();

  constructor(
    @Inject(JOB_RESPONSIBILITIES) private readonly jobResponsibilities: OrgTreeAssignment[],
    @Inject(JOB_ASSIGNMENTS) private readonly jobAssignments: OrgTreeAssignment[],
    @Inject(PROJECTS_TREE_HEADER_HEIGHT) private readonly projectsTreeHeaderHeight: number,
    @Inject(PROJECT_RESPONSIBILITIES) private readonly projectResponsibilities: OrgTreeAssignment[],
    @Inject(PERSONS) private readonly persons: Person[],
    @Inject(SELECTED_PERSONS) selectedPersons: Observable<Person['id'][]>,
    @Inject(HIGHLIGHTED_PERSONS) highlightedPersons: Observable<Person['id'][]>,
    @Inject(RESPONSIBILITIES_VISIBILITY) readonly responsibilitiesVisibility: Observable<boolean>,
    @Inject(ASSIGNMENTS_VISIBILITY) readonly assignmentsVisibility: Observable<boolean>,
  ) {
    combineLatest([
      selectedPersons,
      highlightedPersons,
      responsibilitiesVisibility,
      assignmentsVisibility,
    ]).pipe(
      tap(([sp, hp, rv, av]) => {
        this.selectedPersonIds = sp;
        this.highlightedPersonIds = hp;
        this.responsibilitiesVisible = rv;
        this.assignmentsVisible = av;
        this.refresh();
      }),
      takeUntil(this.destroySubject),
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobNode'] || changes['projectNode'] || changes['mode']) { this.refresh(); }
  }

  private refresh(): void {
    this.refreshAssignments();
    this.refreshHostAppearance();
  }

  private refreshHostAppearance(): void {
    this.isLeaf = !this.projectNode?.nodes?.length;

    this.hostClass = `${BASE_HOST_CLASS}`;
    if (this.mode === 'HEADER') { this.hostClass += ` bg-white ${this.isLeaf ? '' : 'border-r-0'} items-center`; }
    if (this.mode === 'BODY') {
      this.hostClass += ` w-28`;
      if (!this.projectResponsiblePersons.length && !this.jobResponsiblePersons.length && !this.jobAssignedPersons.length) { this.hostClass += ` border-x-0 border-white`; }
    }

    this.hostHeight = this.isLeaf ? this.projectsTreeHeaderHeight : undefined;
    this.hostMaxHeight = this.hostHeight;

    this.hostBorderImage = getPersonsBorderImage([...this.jobResponsiblePersons, ...this.projectResponsiblePersons].filter(p => this.highlightedPersonIds.includes(p.id)));
  }

  private refreshAssignments(): void {
    this.projectResponsiblePersons = this.responsibilitiesVisible ? this.persons
      .filter(p => this.mode === 'HEADER' && this.projectResponsibilities.some(r => r.personId === p.id && r.sourceNodeIds.includes(this.projectNode?.id || '') && !r.targetNodeIds.length))
      .filter(p => this.selectedPersonIds.includes(p.id)) : [];

    this.jobResponsiblePersons = this.responsibilitiesVisible ? this.persons
      .filter(p => this.mode === 'BODY' && this.jobResponsibilities.some(r => r.personId === p.id && r.sourceNodeIds.includes(this.jobNode?.id ?? '') && r.targetNodeIds.includes(this.projectNode?.id ?? '')))
      .filter(p => this.selectedPersonIds.includes(p.id)) : [];

    this.jobAssignedPersons = this.assignmentsVisible ? this.persons
      //.filter(p => this.mode === 'BODY' && this.jobAssignments.some(r => r.personId === p.id && !this.jobNode?.nodes && r.sourceNodeIds.some(sn => this.jobNode?.path?.includes(sn)) && !this.projectNode?.nodes && r.targetNodeIds.some(tn => this.projectNode?.path?.includes(tn))))
      .filter(p => this.mode === 'BODY' && this.jobAssignments.some(r => r.personId === p.id && r.sourceNodeIds.includes(this.jobNode?.id ?? '') && r.targetNodeIds.includes(this.projectNode?.id ?? '')))
      .filter(p => this.selectedPersonIds.includes(p.id)) : [];
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

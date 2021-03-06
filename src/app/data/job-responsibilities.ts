import { InjectionToken } from '@angular/core';
import { OrgTreeAssignment } from '../models/org-tree-assignment';

export const JOB_RESPONSIBILITIES = new InjectionToken<OrgTreeAssignment[]>('Job responsibilities');

export const STATIC_JOB_RESPONSIBILITIES: OrgTreeAssignment[] = [
  { personId: 'AK', sourceNodeIds: ['HR'], targetNodeIds: [] },
  { personId: 'AN', sourceNodeIds: ['DEVOPS'], targetNodeIds: [] },
  { personId: 'ME', sourceNodeIds: ['ACC'], targetNodeIds: [] },
  { personId: 'MO', sourceNodeIds: ['ANG'], targetNodeIds: ['PRTEAM'] },
  { personId: 'RK', sourceNodeIds: ['JAVA'], targetNodeIds: ['PRTEAM'] },
  { personId: 'SK', sourceNodeIds: ['EVENT'], targetNodeIds: [] },
  { personId: 'YA', sourceNodeIds: ['DEV'], targetNodeIds: [] },
];

import { InjectionToken } from '@angular/core';
import { OrgTreeAssignment } from '../models/org-tree-assignment';

export const PROJECT_RESPONSIBILITIES = new InjectionToken<OrgTreeAssignment[]>('Project responsibilities');

export const STATIC_PROJECT_RESPONSIBILITIES: OrgTreeAssignment[] = [
  { personId: 'NS', sourceNodeIds: ['PRTEAM'], targetNodeIds: [] },
  { personId: 'SK', sourceNodeIds: ['FUTURE'], targetNodeIds: [] },
  { personId: 'YA', sourceNodeIds: ['BRWZ'], targetNodeIds: [] },
];

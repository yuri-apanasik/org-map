import { InjectionToken } from '@angular/core';
import { OrgTreeAssignment } from '../models/org-tree-assignment';

export const JOB_RESPONSIBILITIES = new InjectionToken<OrgTreeAssignment[]>('Job responsibilities');

export const STATIC_JOB_RESPONSIBILITIES: OrgTreeAssignment[] = [
  { personId: 'AG', sourceNodeIds: ['JAVA'], targetNodeIds: [] },
  { personId: 'AK', sourceNodeIds: ['HR'], targetNodeIds: [] },
  { personId: 'AN', sourceNodeIds: ['DEVOPS'], targetNodeIds: [] },
  { personId: 'AT', sourceNodeIds: ['NJS'], targetNodeIds: [] },
  { personId: 'KS', sourceNodeIds: ['IOS'], targetNodeIds: [] },
  { personId: 'MA', sourceNodeIds: ['REC'], targetNodeIds: [] },
  { personId: 'ME', sourceNodeIds: ['ACC'], targetNodeIds: [] },
  { personId: 'RK', sourceNodeIds: ['JAVA'], targetNodeIds: ['PRTEAM'] },
  { personId: 'SK', sourceNodeIds: ['EVENT'], targetNodeIds: [] },
  { personId: 'YA', sourceNodeIds: ['DEV'], targetNodeIds: [] },
];

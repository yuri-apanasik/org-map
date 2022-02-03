import { InjectionToken } from '@angular/core';
import { OrgTreeNode } from '../models/org-tree-node';

export const PROJECTS_TREE = new InjectionToken<OrgTreeNode[]>('Projects tree data');
export const PROJECTS_TREE_DEPTH = new InjectionToken<number>('Projects tree depth');
export const PROJECTS_TREE_HEADER_HEIGHT = new InjectionToken<number>('Projects tree header height');

export const STATIC_PROJECTS_TREE: OrgTreeNode[] = [
  {
    id: 'STR',
    title: 'Strabag',
    nodes: [
      {
        id: 'IRIS',
        title: 'IRIS',
        nodes: [
          { id: 'FORMS', title: 'Forms' },
          { id: 'TUN', title: 'Tunnel'},
          { id: 'PGD', title: 'PGD' },
          { id: 'SCM', title: 'SCM' },
          { id: 'COREB', title: 'Core B' },
          { id: 'COREI', title: 'Core I' },
          { id: 'MOB', title: 'Mobile' },
        ],
      },
      {
        id: 'BRWZ',
        title: 'Other',
        nodes: [
          { id: 'RK', title: 'RK' },
        ]
      },
    ]
  },
  {
    id: 'INT',
    title: 'Internal',
    nodes: [
      {
        id: 'PRTEAM',
        title: 'Project team',
      },
      {
        id: 'FUTURE',
        title: 'Future projects',
      },
    ]
  },
];

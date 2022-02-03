import { InjectionToken } from '@angular/core';
import { OrgTreeNode } from '../models/org-tree-node';

export const JOBS_TREE = new InjectionToken<OrgTreeNode[]>('Jobs tree data');
export const JOBS_TREE_DEPTH = new InjectionToken<number>('Jobs tree depth');
export const JOBS_TREE_HEADER_HEIGHT = new InjectionToken<number>('Jobs tree header height');

export const STATIC_JOBS_TREE: OrgTreeNode[] = [
  {
    id: 'PM',
    title: 'Project Management',
  },
  {
    id: 'DEV',
    title: 'Development',
    nodes: [
      {
        id: 'FRONT',
        title: 'Frontend',
        nodes: [
          { id: 'ANG', title: 'Angular' },
          { id: 'VUE', title: 'Vue '},
          { id: 'NJS', title: 'NodeJS' },
        ],
      },
      {
        id: 'BACK',
        title: 'Backend',
        nodes: [
          { id: 'JAVA', title: 'Java' },
          { id: 'DNET', title: '.Net' },
        ],
      },
      {
        id: 'MOB',
        title: 'Mobile',
        nodes: [
          { id: 'AND', title: 'Android' },
          { id: 'IOS', title: 'iOS' },
        ],
      },
      {
        id: 'DEVOPS',
        title: 'DevOps',
      },
      {
        id: 'TEST',
        title: 'Testing',
        nodes: [
          { id: 'MANT', title: 'Manual' },
          { id: 'AUTOT', title: 'Auto' },
        ]
      }
    ]
  },
  {
    id: 'HR',
    title: 'HR',
    nodes: [
      { id: 'REC', title: 'Recruiting' },
      { id: 'EVENT', title: 'Events' },
    ]
  },
  {
    id: 'ACC',
    title: 'Accounting',
  }
];

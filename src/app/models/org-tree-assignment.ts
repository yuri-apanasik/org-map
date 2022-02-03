import { Person } from './person';
import { OrgTreeNode } from './org-tree-node';

export interface OrgTreeAssignment {
  personId: Person['id'];
  sourceNodeIds: OrgTreeNode['id'][];
  targetNodeIds: OrgTreeNode['id'][];
}

export interface OrgTreeNode {
  id: string;
  path?: OrgTreeNode['id'][];
  title: string;
  nodes?: OrgTreeNode[];
}

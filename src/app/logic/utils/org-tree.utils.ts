import { OrgTreeNode } from '../../models/org-tree-node';

export function getTreeDepth(nodes: OrgTreeNode[]): number {
  return Math.max(...nodes.map(node => getTreeNodeDepth(node)));
}

function getTreeNodeDepth(node: OrgTreeNode): number {
  return node.nodes?.length ? 1 + getTreeDepth(node.nodes) : 0;
}

export function processNodePaths(nodes: OrgTreeNode[], prePath: OrgTreeNode['id'][] = []): OrgTreeNode[] {
  nodes.forEach(node => {
    node.path = [...prePath, node.id];
    if (node.nodes?.length) {
      node.nodes = processNodePaths(node.nodes, node.path);
    }
  })
  return nodes;
}

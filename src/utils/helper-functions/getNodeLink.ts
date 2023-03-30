import { TreeNode } from 'types';

export function getNodeLink(node: TreeNode): string {
  return node.isFolder ? `/directory/${node.id}` : `/file/${node.id}`;
}

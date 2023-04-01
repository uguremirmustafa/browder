import { TreeNode } from 'types';

export function findNode(data: TreeNode[], id: number): TreeNode | null {
  for (const node of data) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const result = findNode(node.children, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export const getAncestors = (
  nodeId: number,
  treeNodes: TreeNode[],
  ancestors: TreeNode[] = []
): TreeNode[] | null => {
  for (let i = 0; i < treeNodes.length; i++) {
    const node = treeNodes[i];
    if (node.id === nodeId) {
      return [...ancestors, node];
    }
    const matchingNode = getAncestors(nodeId, node.children, [...ancestors, node]);
    if (matchingNode) {
      return matchingNode;
    }
  }
  return null;
};

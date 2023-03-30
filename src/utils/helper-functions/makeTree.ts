import { IMenuItem, NestedMenuItem, TreeNode } from 'types';
import { getPathFromName } from './getPathFromName';

export function buildMenuItems(
  items: IMenuItem[],
  parentId = 0,
  parentPath = ''
): NestedMenuItem[] {
  const result: NestedMenuItem[] = [];

  for (const item of items.filter((i) => i.parentId === parentId)) {
    const pathPart = getPathFromName(item.name);
    const path = `${parentPath}/${pathPart}`.replace(/\/+/g, '/');
    const menuItem: NestedMenuItem = {
      ...item,
      path,
      parentPath,
      pathPart,
    };
    result.push(menuItem);
    result.push(...buildMenuItems(items, item.id, menuItem.path));
  }

  return result;
}

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

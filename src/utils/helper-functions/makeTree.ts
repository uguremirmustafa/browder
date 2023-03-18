import { IMenuItem, NestedMenuItem, TreeNode } from 'types';
import { getPathFromName } from './getPathFromName';

export function createSidebarMenuTree(
  nodes: any[],
  parentId: number = 0,
  parentPath: string = ''
): TreeNode[] {
  return nodes
    .filter((node) => node.parentId === parentId)
    .map((node) => {
      const pathPart = getPathFromName(node.name);
      const path = `${parentPath}/${pathPart}`.replace(/\/+/g, '/');
      const children = createSidebarMenuTree(nodes, node.id, path);
      return {
        id: node.id,
        name: node.name,
        path,
        parentPath,
        pathPart,
        children: children,
      };
    });
}

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

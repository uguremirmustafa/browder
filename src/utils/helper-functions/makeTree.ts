import { IMenuItem, NestedMenuItem, TreeNode } from 'types';

// export const makeTree = (items: IMenuItem[], id: IMenuItem['id']): TreeNode[] => {
//   return items
//     .filter((item) => item.parentId === id)
//     .map((item) => ({
//       ...item,
//       children: makeTree(items, item.id),
//     }));
// };

export function createSidebarMenuTree(
  nodes: any[],
  parentId: number = 0,
  parentPath: string = ''
): TreeNode[] {
  return nodes
    .filter((node) => node.parentId === parentId)
    .map((node) => {
      const path = `${parentPath}/${node.path}`.replace(/\/+/g, '/');
      const children = createSidebarMenuTree(nodes, node.id, path);
      return {
        id: node.id,
        name: node.name,
        path,
        children: children,
        parentPath,
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
    const menuItem: NestedMenuItem = {
      ...item,
      path: parentPath + item.path,
      parentPath,
    };
    result.push(menuItem);
    result.push(...buildMenuItems(items, item.id, menuItem.path + '/'));
  }

  return result;
}

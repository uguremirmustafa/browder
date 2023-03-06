export interface IMenuItem {
  id: number;
  name: string;
  path: string;
  parentId: IMenuItem['id'];
}

export interface NestedMenuItem extends IMenuItem {
  parentPath: string;
}

export interface TreeNode {
  id: IMenuItem['id'];
  name: IMenuItem['name'];
  path: IMenuItem['name'];
  parentPath: NestedMenuItem['parentPath'];
  children: TreeNode[];
}

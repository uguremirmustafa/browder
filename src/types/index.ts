import { ExoticComponent, LazyExoticComponent, ReactNode } from 'react';

export interface IMenuItem {
  id: number;
  name: string;
  parentId: IMenuItem['id'];
}

export interface NestedMenuItem extends IMenuItem {
  parentPath: string;
  pathPart: string;
  path: string;
}

export interface TreeNode {
  id: IMenuItem['id'];
  name: IMenuItem['name'];
  path: string;
  pathPart: string;
  parentPath: NestedMenuItem['parentPath'];
  children: TreeNode[];
}

export const MODAL_IDS = ['FOLDER_PROPERTIES', 'RENAME'] as const;
export type ModalId = typeof MODAL_IDS[number];

export interface ModalProps {
  id: ModalId;
  title: string;
  content: ReactNode;
}

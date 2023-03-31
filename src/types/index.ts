import { ReactNode } from 'react';

export type IMenuItem = {
  id: number;
  name: string;
  parentId: number | null;
  isFolder: boolean;
};

export interface NestedMenuItem extends IMenuItem {
  parentPath: string;
  pathPart: string;
  path: string;
}

export interface TreeNode {
  id: number;
  name: string;
  isFolder: boolean;
  path: string;
  children: TreeNode[];
}

export interface BreadcrumbLink {
  name: string;
  url: string;
}

export const MODAL_IDS = ['FOLDER_PROPERTIES', 'RENAME', 'NEW_FILE', 'NEW_FOLDER'] as const;
export type ModalId = typeof MODAL_IDS[number];

export interface ModalProps {
  id: ModalId;
  title: string;
  content: ReactNode;
}

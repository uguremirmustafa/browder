import { useActiveElement } from 'hooks/useActiveElement';
import React, { ReactNode, useEffect, useRef } from 'react';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function FolderInfo(props: IProps) {
  const { item } = props;
  const itemCount = item.children.length;
  let label = '';
  if (itemCount === 0) {
    label = 'No items';
  } else if (itemCount === 1) {
    label = '1 item';
  } else {
    label = `${itemCount} items`;
  }

  const activeElement = useActiveElement();

  let focusedLabel = '';
  if (activeElement) {
    const childrenCount = activeElement.getAttribute('data-children-count');
    const isFolder = activeElement.getAttribute('data-isfolder');
    const path = activeElement.getAttribute('data-path');
    let countLabel = '';
    if (childrenCount === '0') {
      countLabel = '(empty folder)';
    } else if (childrenCount === '1') {
      countLabel = '(containing 1 item)';
    } else {
      countLabel = `(containing ${childrenCount} items)`;
    }

    focusedLabel = `${path} ${isFolder === 'true' ? countLabel : ''}`;
  }

  return (
    <div className="w-full rounded bg-blue-100 text-blue-800 px-2 py-1 text-sm shadow">
      {activeElement ? focusedLabel : label}
    </div>
  );
}

export default FolderInfo;

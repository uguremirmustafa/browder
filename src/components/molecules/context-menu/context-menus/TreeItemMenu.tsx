import { useRightClick } from 'context/right-click-context';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function TreeItemMenu(props: IProps) {
  const { item } = props;
  const { close } = useRightClick();
  const isFolder = item.children.length;
  const navigate = useNavigate();

  function openFolder() {
    navigate(item.path);
    close();
  }

  function showProperties() {
    navigate(item.path);
    close();
  }

  if (isFolder) {
    return (
      <ul className="px-2 py-2">
        <li className="px-2 py-1 transition-colors hover:bg-blue-700 rounded">
          <a className="cursor-default" onClick={openFolder}>
            Open folder
          </a>
        </li>
        <li className="px-2 py-1 transition-colors hover:bg-blue-700 rounded">
          <a className="cursor-default" onClick={showProperties}>
            Properties
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <div>{item.name}</div>
    </div>
  );
}

export default TreeItemMenu;

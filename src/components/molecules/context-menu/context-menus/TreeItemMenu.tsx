import FolderPropertiesModal from 'components/molecules/modal/modals/folder-properties-modal';
import { useModal } from 'context/modal-context';
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
  const { setModal } = useModal();
  const isFolder = item.children.length;
  const navigate = useNavigate();

  function openFolder() {
    navigate(item.path);
    close();
  }

  function showProperties() {
    setModal({
      id: 'FOLDER_PROPERTIES',
      title: `${item.name}`,
      content: <FolderPropertiesModal item={item} />,
    });
    close();
  }

  if (isFolder) {
    return (
      <ul className="px-2 py-2">
        <li>
          <a
            className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
            onClick={openFolder}
          >
            Open folder
          </a>
        </li>
        <li>
          <a
            className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
            onClick={showProperties}
          >
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

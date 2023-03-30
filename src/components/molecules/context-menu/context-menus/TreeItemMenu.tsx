import FolderPropertiesModal from 'components/molecules/modal/modals/folder-properties-modal';
import RenameModal from 'components/molecules/modal/modals/rename-modal';
import { useModal } from 'context/modal-context';
import { useRightClick } from 'context/right-click-context';
import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'types';
import { getNodeLink } from 'utils/helper-functions/getNodeLink';

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
    navigate(getNodeLink(item));
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
  function renameFolder() {
    setModal({
      id: 'RENAME',
      title: 'Rename',
      content: <RenameModal item={item} />,
    });
    close();
  }

  return (
    <ul className="px-2 py-2">
      {isFolder ? (
        <li>
          <a
            className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
            onClick={openFolder}
          >
            Open folder
          </a>
        </li>
      ) : null}
      <li>
        <a
          className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
          onClick={renameFolder}
        >
          Rename...
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

export default TreeItemMenu;

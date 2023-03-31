import FolderPropertiesModal from 'components/molecules/modal/modals/folder-properties-modal';
import NewModal from 'components/molecules/modal/modals/new-modal';
import { useModal } from 'context/modal-context';
import { useRightClick } from 'context/right-click-context';
import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'types';

interface IProps {
  currentFolder: TreeNode;
}

function MainContentMenu(props: IProps) {
  const { currentFolder } = props;
  const { close } = useRightClick();
  const { setModal } = useModal();
  const navigate = useNavigate();

  function showProperties() {
    setModal({
      id: 'FOLDER_PROPERTIES',
      title: `${currentFolder.name}`,
      content: <FolderPropertiesModal item={currentFolder} />,
    });
    close();
  }

  function createNewFile() {
    setModal({
      id: 'NEW_FILE',
      title: 'Create New File',
      content: <NewModal currentFolder={currentFolder} />,
    });
    close();
  }
  function createNewFolder() {
    setModal({
      id: 'NEW_FOLDER',
      title: 'Create New Folder',
      content: <NewModal currentFolder={currentFolder} />,
    });
    close();
  }

  return (
    <ul className="p-2">
      <li role="menuitem" tabIndex={0}>
        <a
          className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
          onClick={createNewFile}
        >
          New File
        </a>
      </li>
      <li>
        <a
          className="cursor-default inline-block w-full px-2 py-1 transition-colors hover:bg-blue-700 rounded"
          onClick={createNewFolder}
        >
          New Folder
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

export default MainContentMenu;

import { AddFileIcon, AddFolderIcon, CollapseAllIcon } from 'assets/icons';
import { useModal } from 'context/modal-context';
import NewModal from '../modal/modals/new-modal';
import { useTree } from './context';

function TreeHeader() {
  const { collapseAll } = useTree();
  const { setModal } = useModal();

  function createNewFolder() {
    setModal({
      id: 'NEW_FOLDER',
      title: 'Create new folder',
      content: <NewModal />,
    });
  }
  function createNewFile() {
    setModal({
      id: 'NEW_FILE',
      title: 'Create new file',
      content: <NewModal />,
    });
  }

  return (
    <div className="border-b border-b-slate-700">
      <div className=" w-full flex items-center h-12 justify-between px-4">
        <span>Explorer</span>
        <div className="flex">
          <button className="btn-flu" onClick={createNewFile}>
            <AddFileIcon size={18} />
          </button>
          <button className="btn-flu" onClick={createNewFolder}>
            <AddFolderIcon size={18} />
          </button>
          <button className="btn-flu" onClick={collapseAll}>
            <CollapseAllIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TreeHeader;

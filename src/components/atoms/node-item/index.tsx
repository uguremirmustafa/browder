import { FCFileIcon, FCOpenFolderIcon } from 'assets/icons';
import TreeItemMenu from 'components/molecules/context-menu/context-menus/TreeItemMenu';
import { useRightClick } from 'context/right-click-context';
import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'types';
import { getNodeLink } from 'utils/helper-functions/getNodeLink';

interface IProps {
  item: TreeNode;
}

function NodeItem(props: IProps) {
  const { item } = props;
  const isFolder = item.isFolder;
  const navigate = useNavigate();
  const { setCtxMenu } = useRightClick();

  function handleRightClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    const { pageX, pageY } = e;
    setCtxMenu({
      x: pageX,
      y: pageY,
      isOpen: true,
      children: <TreeItemMenu item={item} />,
    });
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    navigate(getNodeLink(item));
  }

  return (
    <button
      data-path={item.path}
      data-children-count={item.children?.length ?? 0}
      data-isfolder={item.isFolder}
      onContextMenu={handleRightClick}
      onDoubleClick={handleDoubleClick}
      className="p-2 grid place-items-center focus:bg-gray-500 rounded"
    >
      {isFolder ? (
        <FCOpenFolderIcon size={48} viewBoxSize={48} />
      ) : (
        <FCFileIcon size={48} viewBoxSize={48} />
      )}
      <span className="w-28 truncate">{item.name}</span>
    </button>
  );
}

export default NodeItem;

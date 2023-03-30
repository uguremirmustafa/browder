import { FCFileIcon, FCOpenFolderIcon } from 'assets/icons';
import TreeItemMenu from 'components/molecules/context-menu/context-menus/TreeItemMenu';
import { useRightClick } from 'context/right-click-context';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function NodeItem(props: IProps) {
  const { item } = props;
  const isFolder = item.children.length > 0;

  const { setCtxMenu } = useRightClick();

  function handleRightClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const { pageX, pageY } = e;
    setCtxMenu({
      x: pageX,
      y: pageY,
      isOpen: true,
      children: <TreeItemMenu item={item} />,
    });
  }

  return (
    <button
      onContextMenu={handleRightClick}
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

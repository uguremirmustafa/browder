import { ClosedFolderIcon, FCOpenFolderIcon } from 'assets/icons';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function FolderNode(props: IProps) {
  const { item } = props;
  return (
    <button className="p-2 grid place-items-center focus:bg-gray-500 rounded">
      <FCOpenFolderIcon size={48} viewBoxSize={48} />
      <span className="w-28 truncate">{item.name}</span>
    </button>
  );
}

export default FolderNode;

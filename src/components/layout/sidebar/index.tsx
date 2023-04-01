import Tree from 'components/molecules/tree-view';
import { TreeNode } from 'types';

interface IProps {
  tree: TreeNode[];
}

function Sidebar(props: IProps) {
  const { tree } = props;

  return (
    <div className="h-full overflow-x-scroll">
      <Tree tree={tree} />
    </div>
  );
}

export default Sidebar;

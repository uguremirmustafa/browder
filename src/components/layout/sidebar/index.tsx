import Tree from 'components/molecules/tree-view';
import { useState } from 'react';
import { TreeNode } from 'types';

interface IProps {
  tree: TreeNode[];
}

function Sidebar(props: IProps) {
  const { tree } = props;

  const [selectedNode, setSelectedNode] = useState<TreeNode>();
  console.log(tree);
  return (
    <div className="p-2 h-full overflow-x-scroll">
      <Tree tree={tree} setSelectedNode={setSelectedNode} selectedNode={selectedNode} />
    </div>
  );
}

export default Sidebar;

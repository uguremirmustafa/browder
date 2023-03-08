import Tree from 'components/molecules/tree-view';
import { useState } from 'react';
import { IMenuItem, TreeNode } from 'types';
import { createSidebarMenuTree } from 'utils/helper-functions/makeTree';

interface IProps {
  tree: TreeNode[];
}

function Sidebar(props: IProps) {
  const { tree } = props;

  const [selectedNode, setSelectedNode] = useState<TreeNode>();

  return (
    <div className="p-2 h-full overflow-x-scroll">
      <Tree tree={tree} setSelectedNode={setSelectedNode} selectedNode={selectedNode} />
    </div>
  );
}

export default Sidebar;

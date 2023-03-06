import Tree from 'components/molecules/tree-view';
import { useState } from 'react';
import { IMenuItem, TreeNode } from 'types';
import { createSidebarMenuTree } from 'utils/helper-functions/makeTree';

interface IProps {
  menu: IMenuItem[];
}

function Sidebar(props: IProps) {
  const { menu } = props;
  const tree = createSidebarMenuTree(menu);

  const [selectedNode, setSelectedNode] = useState<TreeNode>();

  return (
    <div className="p-2 h-full border-r border-r-slate-700 overflow-x-scroll">
      <Tree tree={tree} setSelectedNode={setSelectedNode} selectedNode={selectedNode} />
    </div>
  );
}

export default Sidebar;

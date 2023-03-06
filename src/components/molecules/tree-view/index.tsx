import { ChevronRightIcon, ClosedFolderIcon, FileIcon, OpenFolderIcon } from 'assets/icons';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TreeNode } from 'types';
import { TreeContext, useTree } from './context';

export interface DrilledProps {
  setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | undefined>>;
  selectedNode: TreeNode | undefined;
}

interface TreeViewProps extends DrilledProps {
  children: ReactNode;
}

function TreeView(props: TreeViewProps) {
  const { children, ...rest } = props;
  return <TreeContext {...rest}>{children}</TreeContext>;
}

interface IProps extends DrilledProps {
  tree: TreeNode[];
}

function Tree(props: IProps) {
  const { tree, ...rest } = props;
  return <TreeView {...rest}>{renderTreeData(tree)}</TreeView>;
}
export default Tree;

export const renderTreeData = (data: TreeNode[]) => {
  return data.map((item) => {
    return (
      <React.Fragment key={item.id}>
        {item.children?.length ? (
          <TreeItem node={item}>{renderTreeData(item.children)}</TreeItem>
        ) : (
          <TreeItem node={item} />
        )}
      </React.Fragment>
    );
  });
};

interface CustomTreeItemProps {
  node: TreeNode;
  children?: ReactNode;
}

const TreeItem = (props: CustomTreeItemProps) => {
  const { node, children } = props;
  const { pathname } = useLocation();
  const { name, id, path, parentPath } = node;
  const { expandedList, handleCollapse, handleExpand } = useTree();

  const isExpanded = expandedList.includes(id);

  function toggle() {
    if (!isExpanded) {
      handleExpand(id);
    } else {
      handleCollapse(id);
    }
  }

  const isSelected = pathname === path;

  return (
    <li className={classNames('transition-all')}>
      <div
        className={classNames('gap-1 rounded flex items-center h-6', isSelected && 'bg-orange-500')}
      >
        {children && (
          <button onClick={toggle} tabIndex={-1} className="pl-1">
            <ChevronRightIcon
              size={18}
              className={classNames(
                '!fill-gray-500 hover:!fill-gray-100 transition duration-200',
                isExpanded && 'rotate-90'
              )}
            />
          </button>
        )}
        <Link
          to={children ? path : parentPath}
          className={classNames(
            'flex items-center gap-1 w-full flex-nowrap',
            !children && 'ml-1.5'
          )}
        >
          {children && (isExpanded ? <OpenFolderIcon size={15} /> : <ClosedFolderIcon size={15} />)}
          {!children && <FileIcon size={15} />} {name}
        </Link>
      </div>
      {isExpanded && (
        <ul
          className={classNames(
            'origin-top transition-all w-full',
            isExpanded ? 'opacity-100' : 'opacity-0',
            'pl-5'
          )}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

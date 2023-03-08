import { ChevronRightIcon, ClosedFolderIcon, FileIcon, OpenFolderIcon } from 'assets/icons';
import classNames from 'classnames';
import { useRightClick } from 'context/right-click-context';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TreeNode } from 'types';
import TreeItemMenu from '../context-menu/context-menus/TreeItemMenu';
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

  const { setCtxMenu } = useRightClick();

  function handleRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const { pageX, pageY } = e;
    setCtxMenu({
      x: pageX,
      y: pageY,
      isOpen: true,
      children: <TreeItemMenu item={node} />,
    });
  }

  return (
    <li className={classNames('transition-all')}>
      <div
        className={classNames(
          'gap-1 rounded flex items-center h-6 group',
          isSelected && 'bg-orange-500',
          !isSelected && 'hover:text-blue-100 transition-colors'
        )}
        onContextMenu={handleRightClick}
      >
        {children && (
          <button onClick={toggle} tabIndex={-1} className="pl-1">
            <ChevronRightIcon
              size={18}
              className={classNames(
                '!fill-gray-400 hover:!fill-gray-100 transition duration-200',
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
          {children &&
            (isExpanded ? (
              <OpenFolderIcon
                size={15}
                className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
              />
            ) : (
              <ClosedFolderIcon
                size={15}
                className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
              />
            ))}
          {!children && (
            <FileIcon
              size={15}
              className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
            />
          )}{' '}
          {name}
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

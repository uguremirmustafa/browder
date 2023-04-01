import {
  AddFileIcon,
  ChevronRightIcon,
  ClosedFolderIcon,
  FileIcon,
  OpenFolderIcon,
} from 'assets/icons';
import classNames from 'classnames';
import { useRightClick } from 'context/right-click-context';
import React, { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TreeNode } from 'types';
import TreeItemMenu from '../context-menu/context-menus/TreeItemMenu';
import { TreeContext, useTree } from './context';
import TreeHeader from './TreeHeader';

interface TreeViewProps {
  children: ReactNode;
}

function TreeView(props: TreeViewProps) {
  const { children } = props;
  return <TreeContext>{children}</TreeContext>;
}

interface IProps {
  tree: TreeNode[];
}

function Tree(props: IProps) {
  const { tree } = props;
  return (
    <TreeView>
      <TreeHeader />
      <div className="p-2">{renderTreeData(tree)}</div>
    </TreeView>
  );
}
export default Tree;

export const renderTreeData = (data: TreeNode[]) => {
  return data.map((item) => {
    return (
      <React.Fragment key={item.id}>
        {item.isFolder ? (
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
  const { directoryId, fileId } = useParams();
  const { name, id, isFolder } = node;
  const hasChild = node.children.length > 0;
  const { expandedList, handleCollapse, handleExpand } = useTree();

  const isExpanded = expandedList.includes(id);

  function toggle() {
    if (!isExpanded && hasChild) {
      handleExpand(id);
    } else {
      handleCollapse(id);
    }
  }

  const isSelected = isFolder ? id === Number(directoryId) : id === Number(fileId);

  const { setCtxMenu } = useRightClick();

  function handleRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    const { pageX, pageY } = e;
    setCtxMenu({
      x: pageX,
      y: pageY,
      isOpen: true,
      children: <TreeItemMenu item={node} />,
    });
  }

  function handleDoubleClick() {
    if (!isExpanded && hasChild) {
      handleExpand(id);
    }
  }

  return (
    <li className={classNames('transition-all')}>
      <div
        className={classNames(
          'gap-1 rounded flex items-center h-6 group',
          isSelected && 'bg-orange-500',
          !isSelected && 'hover:text-blue-100 transition-colors',
          isFolder ? 'ml-0' : 'ml-5'
        )}
        onContextMenu={handleRightClick}
      >
        {isFolder && (
          <button onClick={toggle} className="pl-1">
            <ChevronRightIcon
              size={18}
              className={classNames(
                hasChild && '!fill-gray-400 hover:!fill-gray-100 transition duration-200',
                isExpanded && 'rotate-90',
                !hasChild && '!fill-gray-600'
              )}
            />
          </button>
        )}
        <Link
          to={node.isFolder ? `/directory/${node.id}` : `/file/${node.id}`}
          state={node.path}
          onDoubleClick={handleDoubleClick}
          className={classNames(
            'flex items-center gap-1 w-full flex-nowrap',
            !children && 'ml-1.5'
          )}
        >
          {isFolder &&
            (isExpanded ? (
              <OpenFolderIcon
                size={18}
                className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
              />
            ) : (
              <ClosedFolderIcon
                size={18}
                className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
              />
            ))}
          {!isFolder && (
            <FileIcon
              size={18}
              className={classNames(!isSelected && 'group-hover:fill-blue-100 transition-colors')}
            />
          )}{' '}
          <span className="truncate max-w-[180px]">{name}</span>
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

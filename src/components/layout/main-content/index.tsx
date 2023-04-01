import Alert from 'components/atoms/alert';
import FolderInfo from 'components/atoms/folder-info';
import NodeItem from 'components/atoms/node-item';
import Breadcrumb from 'components/molecules/breadcrumb';
import MainContentMenu from 'components/molecules/context-menu/context-menus/MainContentMenu';
import { useRightClick } from 'context/right-click-context';
import { useLiveQuery } from 'dexie-react-hooks';
import useTree from 'hooks/api/useTree';
import { menuItemTable } from 'lib/db';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TreeNode } from 'types';
import { findNode, getAncestors } from 'utils/helper-functions/makeTree';
import Sidebar from '../sidebar';

function MainContent() {
  const { tree, items } = useTree();
  const { setCtxMenu } = useRightClick();
  const { fileId, directoryId } = useParams();
  const id = fileId ? Number(fileId) : Number(directoryId) ?? 0;

  const currentItem = findNode(tree, id);
  const hasChildren = currentItem && currentItem.children.length > 0;
  const ancestors = getAncestors(id, tree);

  const breadcrumbItems =
    ancestors
      ?.filter((x) => x.isFolder)
      .map((x) => ({ name: x.name, id: x.id, isFolder: x.isFolder })) ?? [];

  function handleRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    if (currentItem) {
      const { pageX, pageY } = e;
      setCtxMenu({
        x: pageX,
        y: pageY,
        isOpen: true,
        children: <MainContentMenu currentFolder={currentItem} />,
      });
    }
  }

  return (
    <>
      <div className="grid grid-cols-12 h-[calc(100vh-7rem)]">
        <div className="col-span-6 sm:col-span-4 xl:col-span-3 border-r border-r-slate-700 h-full">
          <Sidebar tree={tree} />
        </div>
        <div className="col-span-6 sm:col-span-8 xl:col-span-9" onContextMenu={handleRightClick}>
          <div className="border-b border-b-slate-700">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="h-[calc(100vh-7rem)] overflow-y-scroll relative p-2">
            <div className="flex gap-2 flex-wrap">
              {currentItem?.children
                .sort((a) => (a.isFolder ? -1 : 1))
                .map((x) => (
                  <NodeItem key={x.id} item={x} />
                ))}
            </div>
            {!hasChildren ? <Alert>No items here! Right click and add something!</Alert> : null}

            {currentItem ? (
              <div className="absolute right-2 bottom-2">
                <FolderInfo item={currentItem} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;

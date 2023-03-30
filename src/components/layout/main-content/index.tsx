import NodeItem from 'components/atoms/node-item';
import Breadcrumb from 'components/molecules/breadcrumb';
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

  const location = useLocation();
  const { fileId, directoryId } = useParams();
  const id = fileId ? Number(fileId) : Number(directoryId) ?? 0;

  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const currentItem = findNode(tree, id);
  const ancestors = getAncestors(id, tree);

  const breadcrumbItems =
    ancestors
      ?.filter((x) => x.isFolder)
      .map((x) => ({ name: x.name, id: x.id, isFolder: x.isFolder })) ?? [];

  return (
    <>
      <div className="border-b border-b-slate-700">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="grid grid-cols-12 h-[calc(100vh-7rem)]">
        <div className="col-span-6 sm:col-span-4 xl:col-span-3 border-r border-r-slate-700 h-full">
          <Sidebar tree={tree} />
        </div>
        <div className="col-span-6 sm:col-span-8 xl:col-span-9 p-2">
          <div className="h-[calc(100vh-8rem)] overflow-y-scroll">
            <div className="flex gap-2">
              {currentItem?.children.map((x) => (
                <NodeItem item={x} />
              ))}
            </div>
            {/* <pre>{JSON.stringify(currentItem, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;

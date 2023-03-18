import FolderNode from 'components/atoms/folder-node';
import { useLiveQuery } from 'dexie-react-hooks';
import { menuItemTable } from 'lib/db';
import { useLocation } from 'react-router-dom';
import { TreeNode } from 'types';

function MainContent() {
  const location = useLocation();
  const node = location.state as TreeNode;

  return (
    <div className="h-[calc(100vh-8rem)] overflow-y-scroll">
      <div className="flex gap-2">
        {/* <pre>{JSON.stringify(location.state, null, 2)}</pre> */}
        {node.children.map((x) => {
          return <FolderNode item={x} key={x.id} />;
        })}
      </div>
    </div>
  );
}

export default MainContent;

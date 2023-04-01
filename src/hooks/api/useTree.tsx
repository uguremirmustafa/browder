import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { menuItemTable } from 'lib/db';
import { IMenuItem, TreeNode } from 'types';

interface Acc {
  [id: number]: TreeNode;
}

function useTree() {
  const [tree, setTree] = useState<TreeNode[]>([]);

  const items = useLiveQuery(() => menuItemTable.toArray(), [menuItemTable], [] as IMenuItem[]);

  const getTree = () => {
    if (!items) return;

    // Create a map of items indexed by their ids
    const itemMap: Acc = items.reduce((acc: Acc, item: IMenuItem) => {
      acc[item.id] = { ...item, children: [], path: item.name };
      return acc;
    }, {});

    // Build the tree structure by linking parent-child relationships
    const roots: TreeNode[] = [];
    items.forEach((item) => {
      if (!item.parentId) {
        console.log('here', itemMap[item.id]);
        roots.push(itemMap[item.id]);
      } else {
        const parent = itemMap[item.parentId];
        parent.children.push(itemMap[item.id]);
        itemMap[item.id].path = `${parent.path}/${itemMap[item.id].name}`;
      }
    });

    setTree(roots.map((x) => ({ ...x, children: x.children.sort((a) => (a.isFolder ? -1 : 1)) })));
  };

  useEffect(() => {
    getTree();
  }, [items]);

  return { tree, items };
}

export default useTree;

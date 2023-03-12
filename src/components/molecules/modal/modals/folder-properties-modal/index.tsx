import React, { ReactNode } from 'react';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function FolderPropertiesModal(props: IProps) {
  const { item } = props;
  return (
    <div>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}

export default FolderPropertiesModal;

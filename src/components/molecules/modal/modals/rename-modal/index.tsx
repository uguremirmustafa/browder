import SaveButton from 'components/atoms/save-button';
import { useModal } from 'context/modal-context';
import { menuItemTable } from 'lib/db';
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreeNode } from 'types';
import { getPathFromName } from 'utils/helper-functions/getPathFromName';

interface IProps {
  item: TreeNode;
}

function RenameModal(props: IProps) {
  const { item } = props;
  const isFolder = item.children.length;
  const { close } = useModal();
  const navigate = useNavigate();
  const [value, setValue] = useState(() => item.name);
  const [error, setError] = useState('');

  function save() {
    menuItemTable
      .update(item.id, { name: value })
      .then(() => {
        if (isFolder) {
          navigate(`${item.parentPath}/${getPathFromName(value)}`, { state: item });
        }
        close();
      })
      .catch((_reason) => {
        setError(`${isFolder ? 'Folder' : 'File'} already exists!`);
      });
  }
  return (
    <div>
      <input
        className="text-field"
        type="text"
        value={value}
        onChange={(e) => {
          if (error) {
            setError('');
          }
          setValue(e.target.value);
        }}
        autoFocus
      />
      {error && <p className="text-orange-500">{error}</p>}
      <SaveButton className="float-right mt-3" onClick={save} disabled={!!error} />
    </div>
  );
}

export default RenameModal;

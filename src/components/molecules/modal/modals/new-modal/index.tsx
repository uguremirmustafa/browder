import SaveButton from 'components/atoms/save-button';
import { useModal } from 'context/modal-context';
import { menuItemTable } from 'lib/db';
import React, { ReactNode, useState } from 'react';
import { IMenuItem, TreeNode } from 'types';

interface IProps {
  currentFolder: TreeNode;
}

function NewModal(props: IProps) {
  const { currentFolder } = props;
  const { modal, close } = useModal();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  if (!modal) {
    return null;
  }

  const save = () => {
    const isFolder = modal.id === 'NEW_FOLDER';
    const newMenuItem: Omit<IMenuItem, 'id'> = {
      parentId: currentFolder.id,
      isFolder,
      name: value,
    };
    menuItemTable
      .add(newMenuItem as IMenuItem)
      .then(() => {
        // TODO: focus onto the new item
        close();
      })
      .catch((_reason) => {
        setError(`${isFolder ? 'Folder' : 'File'} already exists!`);
      });
  };

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

export default NewModal;

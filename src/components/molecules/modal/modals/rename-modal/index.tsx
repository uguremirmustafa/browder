import SaveButton from 'components/atoms/save-button';
import { useModal } from 'context/modal-context';
import { menuItemTable } from 'lib/db';
import { useState } from 'react';
import { TreeNode } from 'types';

interface IProps {
  item: TreeNode;
}

function RenameModal(props: IProps) {
  const { item } = props;
  const isFolder = item.isFolder;
  const { close } = useModal();
  const [value, setValue] = useState(() => item.name);
  const [error, setError] = useState('');

  function save() {
    menuItemTable
      .update(item.id, { name: value })
      .then(() => {
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

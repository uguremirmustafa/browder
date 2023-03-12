import { CloseIcon } from 'assets/icons';
import { useModal } from 'context/modal-context';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function ModalHeader(props: IProps) {
  const { children } = props;
  const { close } = useModal();

  return (
    <div className="flex justify-between items-center h-12 bg-gray-700 px-3">
      <h2>{children}</h2>
      <button onClick={close}>
        <CloseIcon size={20} className="hover:fill-gray-400" />
      </button>
    </div>
  );
}

export default ModalHeader;

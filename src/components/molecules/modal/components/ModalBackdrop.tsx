import classNames from 'classnames';
import { useModal } from 'context/modal-context';
import { ReactNode, useRef } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

interface IProps {
  children: ReactNode;
}

function ModalBackdrop(props: IProps) {
  const { children } = props;
  const { modal, close } = useModal();
  const isActive = !!modal;

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick([ref], close);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={classNames(
        'bg-gray-900/80 absolute top-0 left-0 h-screen w-full z-10',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        ref={ref}
        className={classNames(
          'bg-gray-600 rounded overflow-hidden',
          'min-w-[500px]',
          'absolute left-1/2 -translate-x-1/2 top-20'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalBackdrop;

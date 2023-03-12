import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function ModalBody(props: IProps) {
  const { children } = props;
  return (
    <div className={classNames('p-3', 'max-h-[calc(100vh-200px)] overflow-scroll')}>{children}</div>
  );
}

export default ModalBody;

import { SaveIcon } from 'assets/icons';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function SaveButton(props: IProps) {
  const { children, className, ...rest } = props;
  return (
    <button className={classNames(className, 'btn')} {...rest}>
      <SaveIcon size={16} className="mr-2" /> {children ?? 'Save'}
    </button>
  );
}

export default SaveButton;

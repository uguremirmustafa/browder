import { ErrorIcon, InfoIcon, WarningIcon } from 'assets/icons';
import React, { ReactElement, ReactNode } from 'react';

type AlertVariant = 'warning' | 'info' | 'error';

interface IProps {
  children: ReactNode;
  variant?: AlertVariant;
}

function Alert(props: IProps) {
  const { children, variant = 'error' } = props;
  return (
    <div className="p-2 rounded bg-blue-600/30 flex items-center gap-4">
      {getIcon(variant)}
      <p className="text-gray-400">{children}</p>
    </div>
  );
}

export default Alert;

function getIcon(variant: AlertVariant) {
  return React.cloneElement(ICONS[variant], { size: 24, className: '!fill-gray-400' });
}

const ICONS: Record<AlertVariant, ReactElement> = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
};

import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function AppContainer(props: IProps) {
  const { children } = props;
  return (
    <div className="max-w-[1400px] w-full bg-blue-900/30 rounded mx-auto my-8 h-[calc(100vh-4rem)]">
      {children}
    </div>
  );
}

export default AppContainer;

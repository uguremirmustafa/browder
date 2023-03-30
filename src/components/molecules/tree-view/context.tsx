import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { TreeNode } from 'types';

interface InitialValues {
  expandedList: number[];
  setExpandedList: React.Dispatch<React.SetStateAction<number[]>>;
  handleExpand: (id: number) => void;
  handleCollapse: (id: number) => void;
}

const initialValues: InitialValues = {
  expandedList: [],
  setExpandedList: () => {},
  handleExpand: () => {},
  handleCollapse: () => {},
};

const Context = createContext<InitialValues>(initialValues);

interface IProps {
  children: ReactNode;
}

export const TreeContext = (props: IProps) => {
  const { children } = props;
  const [expandedList, setExpandedList] = useState<TreeNode['id'][]>([2, 7]);

  function handleExpand(id: number) {
    setExpandedList((old) => {
      return [...old, id];
    });
  }
  function handleCollapse(id: number) {
    setExpandedList((old) => {
      return old.filter((x) => x !== id);
    });
  }

  const contextValue = useMemo(
    () => ({
      expandedList,
      setExpandedList,
      handleExpand,
      handleCollapse,
    }),
    [expandedList, setExpandedList, handleExpand, handleCollapse]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useTree = () => {
  const context = useContext(Context);

  return context;
};

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { TreeNode } from 'types';
import { DrilledProps } from '.';

interface InitialValues extends DrilledProps {
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
  selectedNode: undefined,
  setSelectedNode: () => {},
};

const Context = createContext<InitialValues>(initialValues);

interface IProps extends DrilledProps {
  children: ReactNode;
}

export const TreeContext = (props: IProps) => {
  const { children, selectedNode, setSelectedNode } = props;
  const [expandedList, setExpandedList] = useState<TreeNode['id'][]>([1, 3]);

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
      selectedNode,
      setSelectedNode,
    }),
    [expandedList, setExpandedList, handleExpand, handleCollapse, selectedNode, setSelectedNode]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useTree = () => {
  const context = useContext(Context);

  return context;
};

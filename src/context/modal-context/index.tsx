import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ModalId, ModalProps } from 'types';

interface InitialValues {
  modal: ModalProps | undefined;
  setModal: React.Dispatch<React.SetStateAction<ModalProps | undefined>>;
  close: () => void;
}

const initialValues: InitialValues = {
  modal: undefined,
  setModal: () => {},
  close: () => {},
};

const Context = createContext<InitialValues>(initialValues);

interface IProps {
  children: ReactNode;
}

const ModalWrapper = (props: IProps) => {
  const { children } = props;
  const [modal, setModal] = useState<ModalProps | undefined>();

  function close() {
    setModal(undefined);
  }

  const contextValue = useMemo(
    () => ({
      modal,
      setModal,
      close,
    }),
    [modal, setModal, close]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export default ModalWrapper;

export const useModal = () => {
  const context = useContext(Context);

  return context;
};

import { useModal } from 'context/modal-context';
import ModalBackdrop from './components/ModalBackdrop';
import ModalBody from './components/ModalBody';
import ModalHeader from './components/ModalHeader';

function AppModal() {
  const { modal } = useModal();

  const isActive = !!modal;

  if (!isActive) {
    return null;
  }

  return (
    <ModalBackdrop>
      <ModalHeader>{modal.title}</ModalHeader>
      <ModalBody>{modal.content}</ModalBody>
    </ModalBackdrop>
  );
}

export default AppModal;

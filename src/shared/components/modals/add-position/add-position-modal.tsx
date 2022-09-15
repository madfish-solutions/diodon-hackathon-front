import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';
import { modalsStyle } from '../modals-style';

export const AddPositionModal: FC = observer(() => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.AddPosition);
  const closeModal = () => modalsStore.close();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalsStyle}>
      <h2>Add Position</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
      </form>
    </Modal>
  );
});

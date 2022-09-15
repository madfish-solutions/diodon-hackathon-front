import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';
import { MarketId } from '../../../types';
import { modalsStyle } from '../modals-style';

interface Props {
  marketId: MarketId;
}

export const OpenPositionModal: FC<Props> = observer(({ marketId }) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModal = () => modalsStore.close();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalsStyle}>
      <h2>Open Position {marketId}</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
      </form>
    </Modal>
  );
});

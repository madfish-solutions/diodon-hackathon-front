import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useModalsStore } from '../../hooks';
import { ModalType } from '../../store/modals.store';
import { AddPositionModal } from './add-position';
import { ClosePositionModal } from './close-position';
import { OpenPositionModal } from './open-position';

export const Modals: FC = observer(() => {
  const { modal } = useModalsStore();

  switch (modal) {
    case ModalType.OpenPosition:
      return <OpenPositionModal />;
    case ModalType.ClosePosition:
      return <ClosePositionModal />;
    case ModalType.AddPosition:
      return <AddPositionModal />;
    default:
      return null;
  }
});

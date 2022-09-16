import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useAuthStore, useModalsStore } from '../../hooks';
import { ModalType } from '../../store/modals.store';
import { AddPositionModal } from './add-position';
import { ClosePositionModal } from './close-position';
import { OpenPositionModal } from './open-position';

export const Modals: FC = observer(() => {
  const { isConnected } = useAuthStore();
  const { modal, payload } = useModalsStore();
  if (!payload || !isConnected) {
    return null;
  }

  switch (modal) {
    case ModalType.OpenPosition:
      return <OpenPositionModal marketId={payload.marketId} />;
    case ModalType.AddPosition:
      return <AddPositionModal marketId={payload.marketId} />;
    case ModalType.ClosePosition:
      return <ClosePositionModal marketId={payload.marketId} />;
    default:
      return null;
  }
});
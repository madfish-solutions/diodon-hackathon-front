import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useAuthStore, useModalsStore } from '../../hooks';
import { ModalType } from '../../store/modals.store';
import { ManagePositionModal } from './manage-position';
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
    case ModalType.ManagePosition:
      return <ManagePositionModal marketId={payload.marketId} />;
    default:
      return null;
  }
});

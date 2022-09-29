import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useModalsStore } from '../../hooks';
import { ModalType } from '../../store/modals.store';
import { Tab } from '../operation-switcher';
import { FinOperationModal } from './fin-operation-modal';
import { ManagePositionModal } from './manage-position';
import { OpenPositionModal } from './open-position';

export const Modals: FC = observer(() => {
  const { modal, payload } = useModalsStore();

  switch (modal) {
    case ModalType.OpenPosition:
      return <OpenPositionModal marketId={payload?.marketId} />;
    case ModalType.ManagePosition:
      return <ManagePositionModal marketId={payload?.marketId} />;
    case ModalType.Deposit:
      return <FinOperationModal initialTab={Tab.DEPOSIT} />;
    case ModalType.Withdraw:
      return <FinOperationModal initialTab={Tab.WITHDRAW} />;
    default:
      return null;
  }
});

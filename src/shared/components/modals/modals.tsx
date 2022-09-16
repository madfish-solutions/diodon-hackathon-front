import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useModalsStore } from '../../hooks';
import { ModalType } from '../../store/modals.store';
import { DepositModal } from './deposit';
import { ManagePositionModal } from './manage-position';
import { OpenPositionModal } from './open-position';
import { WithdrawModal } from './withdraw';

export const Modals: FC = observer(() => {
  const { modal, payload } = useModalsStore();

  switch (modal) {
    case ModalType.OpenPosition:
      return <OpenPositionModal marketId={payload?.marketId} />;
    case ModalType.ManagePosition:
      return <ManagePositionModal marketId={payload?.marketId} />;
    case ModalType.Deposit:
      return <DepositModal />;
    case ModalType.Withdraw:
      return <WithdrawModal />;
    default:
      return null;
  }
});

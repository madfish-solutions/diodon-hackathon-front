import { FC } from 'react';

import { Switcher } from '../switcher';

export enum Tab {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw'
}

interface Props {
  operation: Tab;
  onClick: (tab: Tab) => void;
  className?: string;
}

const OPTIONS = [
  { label: Tab.DEPOSIT, value: Tab.DEPOSIT },
  { label: Tab.WITHDRAW, value: Tab.WITHDRAW }
];

export const OperationSwitcher: FC<Props> = ({ operation, onClick, className }) => {
  return <Switcher options={OPTIONS} value={operation} onClick={onClick} className={className} />;
};

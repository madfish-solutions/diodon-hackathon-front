import { FC } from 'react';

import { Button } from '@shared/components';

interface Props {
  onClick?: () => void;
  className?: string;
}

export const CloseIcon: FC<Props> = ({ onClick, className }) => (
  <Button theme="secondary" onClick={onClick} className={className}>
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2 2 18m16 0L2 2" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
    </svg>
  </Button>
);

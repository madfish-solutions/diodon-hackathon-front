import { FC } from 'react';

import { CloseIcon } from '../../svg';
import { Button } from '../button';

interface Props {
  onClick?: () => void;
  className?: string;
}

export const CloseButton: FC<Props> = ({ onClick, className }) => (
  <Button theme="secondary" onClick={onClick} className={className}>
    <CloseIcon />
  </Button>
);

import { FC } from 'react';

import { Button } from '../button';
import { useGiveMeMoneyButtonViewModel } from './use-give-me-money-button.vm';

interface Props {
  className?: string;
}

export const GiveMeMoneyButton: FC<Props> = props => {
  const { handleClick, isLoading, isVisible } = useGiveMeMoneyButtonViewModel();

  if (!isVisible) {
    return null;
  }

  return (
    <Button loading={isLoading} onClick={handleClick} {...props}>
      Give me money
    </Button>
  );
};

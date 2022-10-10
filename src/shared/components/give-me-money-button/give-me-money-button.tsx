import { FC } from 'react';

import { Button } from '../button';
import { useGiveMeMoneyButtonViewModel } from './use-give-me-money-button.vm';

interface Props {
  className?: string;
}

export const GiveMeMoneyButton: FC<Props> = props => {
  const { handleClick, isLoading, isVisible, buttonLabel, disabled } = useGiveMeMoneyButtonViewModel();

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <Button loading={isLoading} disabled={disabled} onClick={handleClick} {...props} id="give-me-money">
        {buttonLabel}
      </Button>
    </div>
  );
};

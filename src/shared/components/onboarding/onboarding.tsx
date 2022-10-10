import { FC, useEffect, useState } from 'react';

import { Steps } from 'intro.js-react';

import './onboarding.css';
import { ONBOARDING_STEPS } from '../../utils/onboarding/ONBOARDING_STEPS';

export const Onboarding: FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      return;
    }
    setTimeout(() => {
      if (enabled) {
        return;
      }
      setEnabled(true);
      // eslint-disable-next-line no-console
      console.log('show');
    }, 1000);
  }, [enabled]);

  const onChange = async (nextStepIndex: number) => {
    // eslint-disable-next-line no-console
    console.log('nextStepIndex', nextStepIndex);
  };

  const onExit = () => {
    // eslint-disable-next-line no-console
    console.log('onExit');
  };

  const onStart = () => {
    // eslint-disable-next-line no-console
    console.log('onStart');
  };

  return (
    <Steps
      enabled={enabled}
      initialStep={0}
      options={{ hideNext: false }}
      steps={ONBOARDING_STEPS}
      onChange={onChange}
      onExit={onExit}
      onStart={onStart}
    />
  );
};

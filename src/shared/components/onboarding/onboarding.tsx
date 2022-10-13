import { FC, useEffect, useState } from 'react';

import { Steps } from 'intro.js-react';

import './onboarding.css';
import { ONBOARDING_LS_KEY, ONBOARDING_STEPS } from '../../utils/onboarding/ONBOARDING_STEPS';

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
    }, 1000);
  }, [enabled]);

  const onChange = async (nextStepIndex: number) => {
    // eslint-disable-next-line no-console
    // console.log('nextStepIndex', nextStepIndex);
  };

  const onExit = () => {
    try {
      if (enabled) {
        localStorage.setItem(ONBOARDING_LS_KEY, '1');
      }
    } catch (_) {}
  };

  const onStart = () => {
    // eslint-disable-next-line no-console
    // console.log('onStart');
  };

  const checkOnboarding = () => {
    try {
      return localStorage.getItem(ONBOARDING_LS_KEY) === '1';
    } catch (_) {
      return false;
    }
  };

  const isSeen = checkOnboarding();

  if (isSeen) {
    return null;
  }

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

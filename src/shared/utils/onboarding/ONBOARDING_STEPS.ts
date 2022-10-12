import { Step } from 'intro.js-react';

export interface OnboardingStep extends Step {
  title: string;
  id: string;
}

const DEFAULT_STEP: Partial<Step> = {
  highlightClass: 'highlightOnboarding',
  tooltipClass: 'tooltipOnboarding'
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    ...DEFAULT_STEP,
    id: '#top-logo',
    intro: 'You are welcome to the first perpetual protocol on Klaytn.',
    title: '👋 Welcome!'
  },
  {
    ...DEFAULT_STEP,
    element: '#connect-button',
    id: '#connect-button',
    intro: 'Connect your MetaMask wallet to start trading. <br />Sidechain of Diodon should be added automatically.',
    title: '🦊 MetaMask'
  },
  {
    ...DEFAULT_STEP,
    element: '#give-me-money',
    id: '#give-me-money',
    intro: 'Use faucet to get some testnet tokens. <br />DDAI test token should be added automatically.',
    title: '🪙 Tokens'
  },

  {
    ...DEFAULT_STEP,
    element: '#markets-list',
    id: '#markets-list',
    intro: 'Try to not loose your money ;-)',
    title: '🔥 Trading'
  },

  {
    ...DEFAULT_STEP,
    element: '#top-stats',
    id: '#top-stats',
    intro: 'Check your balance and other stats.',
    title: '📈 Balance'
  },

  {
    ...DEFAULT_STEP,
    element: '#socials',
    id: '#socials',
    intro: 'Follow us on social media.',
    title: '💞 Social'
  },

  {
    ...DEFAULT_STEP,
    element: '#top-logo',
    id: '#top-logo',
    intro: 'Financial wisdom starts here',
    title: '🐡 Diodon'
  }
];

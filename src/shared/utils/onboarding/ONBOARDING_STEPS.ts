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
    intro: 'Hi, bro or sis! You are exploring the first on-chain perpetual futures for stocks.',
    title: '👋 Welcome!'
  },
  {
    ...DEFAULT_STEP,
    element: '#connect-button',
    id: '#connect-button',
    intro:
      "Connect your MetaMask wallet and crack on with trading. Diodon's Service Chain should be added automatically.",
    title: '🦊 MetaMask'
  },
  {
    ...DEFAULT_STEP,
    element: '#give-me-money',
    id: '#give-me-money',
    intro: 'Use faucet to get some testnet tokens. DDAI test token will appear in your wallet.',
    title: '🪙 Tokens'
  },

  {
    ...DEFAULT_STEP,
    element: '#markets-list',
    id: '#markets-list',
    intro: 'Play with markets, bet on price moves and score profit!',
    title: '🔥 Trading'
  },

  {
    ...DEFAULT_STEP,
    element: '#top-stats',
    id: '#top-stats',
    intro: 'Track your portfolio.',
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
    element: '#feedback',
    id: '#feedback',
    intro: 'Share your experience and help us make the platform better for you!',
    title: '🐡 Feedback'
  }
];

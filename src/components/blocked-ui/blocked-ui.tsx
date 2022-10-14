import { FC } from 'react';

import { LogoShyIcon } from '@shared/svg';

export const BlockedUi: FC = () => (
  <div>
    <div style={{ textAlign: 'center', margin: '64px 24px' }}>
      <LogoShyIcon />
    </div>
    <div style={{ color: '#fff', textAlign: 'center', margin: '32px 24px' }}>
      Oops, I&nbsp;am embarrassed by&nbsp;my&nbsp;mobile version. I&nbsp;am waiting you on&nbsp;the&nbsp;Google Chrome
      Desktop!
    </div>
  </div>
);

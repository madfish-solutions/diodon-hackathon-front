import { FC } from 'react';

import { LogoYellowIcon } from '@shared/svg';

export const BlockedUi: FC = () => (
  <div>
    <div style={{ textAlign: 'center', margin: '32px 24px' }}>
      <LogoYellowIcon />
    </div>
    <div style={{ color: '#fff', textAlign: 'center', margin: '64px 24px' }}>
      Oops, I&nbsp;am embarrassed by&nbsp;my&nbsp;mobile version. I&nbsp;am waiting you on&nbsp;the&nbsp;Desktop!
    </div>
    <div style={{ textAlign: 'center', margin: '16px 24px', fontSize: '6rem' }}>🤪</div>
  </div>
);

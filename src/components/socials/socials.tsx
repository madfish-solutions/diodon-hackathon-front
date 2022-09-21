import { FC } from 'react';

import { Button } from '@shared/components';

import { SocialLinksData } from './content';
import styles from './socials.module.scss';

export const Socials: FC = () => {
  return (
    <div className={styles.socials}>
      {SocialLinksData.map(({ id, href, label, Icon }) => (
        <Button key={id} href={href} external title={label} className={styles.button}>
          <Icon />
        </Button>
      ))}
    </div>
  );
};

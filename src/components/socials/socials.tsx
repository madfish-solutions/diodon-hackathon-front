import { FC } from 'react';

import cx from 'classnames';

import { Button } from '@shared/components';

import { SocialLinksData } from './content';
import styles from './socials.module.scss';

export const Socials: FC = () => {
  return (
    <div className={styles.root}>
      {SocialLinksData.map(({ id, href, label, Icon }) => (
        <Button theme="secondary" key={id} href={href} external title={label} className={styles.button}>
          <Icon className={cx(styles.iconHover, styles[`icon-active-${label}`])} />
        </Button>
      ))}
    </div>
  );
};

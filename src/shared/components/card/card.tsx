import { FC, HTMLProps, ReactNode } from 'react';

import cx from 'classnames';

import styles from './card.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  header?: {
    content: ReactNode;
    button?: ReactNode;
    className?: string;
  };
  subheader?: {
    content: ReactNode;
    button?: ReactNode;
    className?: string;
  };
  additional?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  footerClassName?: string;
}

export const Card: FC<Props> = ({
  className,
  header,
  subheader,
  additional,
  footer,
  children,
  contentClassName,
  footerClassName,
  ...props
}) => {
  return (
    <div className={cx(styles.root, className)} {...props}>
      {header && (
        <div className={cx(header.className)}>
          <span>{header.content}</span>
          {header.button}
        </div>
      )}
      {subheader && (
        <div className={cx(styles.header, subheader.className)}>
          <span>{subheader.content}</span>
          {subheader.button}
        </div>
      )}
      {additional && <div className={styles.additional}>{additional}</div>}
      <div className={cx(styles.content, contentClassName)}>{children}</div>
      {footer && <div className={cx(styles.footer, footerClassName)}>{footer}</div>}
    </div>
  );
};

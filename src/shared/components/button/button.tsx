import { ForwardRefExoticComponent, HTMLProps, RefAttributes } from 'react';

import cx from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import { CFC, isUndefined } from '@shared/types';

import styles from './button.module.scss';

export type ButtonProps = {
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  external?: boolean;
  className?: string;
} & (HTMLProps<HTMLButtonElement> | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>);

export const Button: CFC<ButtonProps> = ({
  loading,
  type = 'button',
  external = false,
  className,
  children,
  ...props
}) => {
  if ('href' in props && !isUndefined(props.href)) {
    const anchorProps = {
      target: external ? '_blank' : undefined,
      rel: external ? 'noreferrer noopener' : undefined,
      className: cx(styles.root, className),
      ...(props as ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> & { href: string })
    };

    if (anchorProps.target === '_blank') {
      return <a {...anchorProps}>{children}</a>;
    } else {
      return (
        <Link to={anchorProps.href} {...anchorProps}>
          {children}
        </Link>
      );
    }
  }

  return (
    <button
      // @ts-ignore
      type={type}
      className={styles.root}
      {...(props as HTMLProps<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

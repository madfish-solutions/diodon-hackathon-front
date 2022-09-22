import { FC } from 'react';

import { Button, ConnectButton } from '@shared/components';
import { DiodonLogo } from '@shared/svg';

import styles from './data-card.module.scss';

const stepsToStart = ['Connect a wallet', 'Place a deposit', 'Trade'];

const connected = true;

export const DataCard: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.label}>Account Data</h1>
      <div className={styles.root}>
        {connected ? (
          <div className={styles.card}>
            <div className={styles.mainInfo}>NET COLLATERAL: 1,212.12 KDAI</div>
            <div className={styles.additionalInfo}>
              <div>Buying power: $ 10,743.1</div>
              <div>Free collateral: $ 4,200.17</div>
              <div>Opened positions: $ 6,743.12</div>
              <div>Margin ratio: 666.13</div>
              <div>Leverage: 0.47x</div>
            </div>
            <div>Low risk: you’re going to get a good night’s sleep.</div>
            <div className={styles.buttons}>
              <Button className={styles.button}>Deposit</Button>
              <Button className={styles.button}>Withdraw</Button>
            </div>
          </div>
        ) : (
          <div className={styles.mainScreen}>
            <div>
              <DiodonLogo />
            </div>
            <div className={styles.mainText}>start trading!</div>
            <div>
              <ul>
                {stepsToStart.map(step => (
                  <li>{step}</li>
                ))}
              </ul>
            </div>
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

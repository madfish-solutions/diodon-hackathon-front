import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Cell } from '@components/cell';
import { ConnectButton } from '@shared/components';
import { DiodonLogo } from '@shared/svg';

import styles from './data-card.module.scss';
import { useDataCardViewModel } from './use-data-card.vm';

const stepsToStart = ['Connect a wallet', 'Place a deposit', 'Trade'];

export const DataCard: FC = observer(() => {
  const { isConnected } = useDataCardViewModel();

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        {isConnected ? (
          <div className={styles.card}>
            <Cell label="Net Collateral:">10000</Cell>
            <div className={styles.additionalInfo}>
              <div>Free collateral: $ 4,200.17</div>
              <div>Opened positions: $ 6,743.12</div>
              <div>Margin ratio: 666.13</div>
              <div>Leverage: 0.47x</div>
            </div>
            <div>Low risk: you’re going to get a good night’s sleep.</div>
          </div>
        ) : (
          <div className={styles.mainScreen}>
            <div className={styles.firstSection}>
              <ul>
                {stepsToStart.map(step => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <ConnectButton />
            </div>
            <div className={styles.secondSection}>
              <DiodonLogo />
              <div className={styles.mainText}>start trading!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

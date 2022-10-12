import { FC } from 'react';

import { MarginSlider } from '../../../../account/components/margin-slider';
import styles from '../market-item.module.scss';

export const getMarginRiskColor = (marginRatioPercentage: number) => {
  if (marginRatioPercentage <= 6.5) {
    return '#000000';
  }
  if (marginRatioPercentage <= 50) {
    return '#FFD700';
  }

  return '#00FF0A';
};

const getMessage = (marginRatioPercentage: number) => {
  if (marginRatioPercentage <= 6.5) {
    return 'High risk: your positions are at risk of being liquidated! Add more funds to avoid liquidation!';
  }
  if (marginRatioPercentage <= 50) {
    return 'Medium risk: keep your margin ratio above 6.25% to avoid liquidation.';
  }

  return "Low risk: you're going to get a good night’s sleep.";
};

interface Props {
  marginRatioPercentage: number;
}

export const MarginRisk: FC<Props> = ({ marginRatioPercentage }) => {
  return (
    <>
      <div style={{ marginRight: 8 }}>
        <div className={styles.marginLevel}>Margin level:</div>
        <div className={styles.explanation} style={{ color: getMarginRiskColor(marginRatioPercentage) }}>
          {getMessage(marginRatioPercentage)}
        </div>
      </div>
      <MarginSlider value={marginRatioPercentage} className={styles.slider} />
    </>
  );
};

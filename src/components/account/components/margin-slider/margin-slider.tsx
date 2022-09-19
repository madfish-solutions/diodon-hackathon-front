import cx from 'classnames';
import ReactSlider from 'react-slider';

import { checkpoints, MAX_SLIDER_VALUE, SLIDER_STEP } from './constants';
import { percentageToSliderValue } from './helpers';
import styles from './margin-slider.module.scss';

interface MarginSliderProps {
  value: number;
}

export const MarginSlider: React.FC<MarginSliderProps> = ({ value }) => {
  return (
    <div>
      <ReactSlider
        className={styles.slider}
        disabled
        thumbClassName={styles.thumb}
        min={0}
        max={MAX_SLIDER_VALUE}
        step={SLIDER_STEP}
        trackClassName={styles.track}
        value={percentageToSliderValue(value)}
        renderTrack={(props, state) => (state.index === 0 ? <div {...props} /> : null)}
      />
      <div className={styles.marksWrapper}>
        <div className={cx(styles.customMarkWrapper, styles.customMarkWrapper1)}>
          <span className={styles.customMark}>{checkpoints[1]} %</span>
        </div>
        <div className={cx(styles.customMarkWrapper, styles.customMarkWrapper2)}>
          <span className={styles.customMark}>{checkpoints[2]} %</span>
        </div>
      </div>
    </div>
  );
};

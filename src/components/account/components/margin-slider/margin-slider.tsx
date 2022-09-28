import { HTMLProps, RefCallback, useRef } from 'react';

import cx from 'classnames';
import ReactSlider from 'react-slider';

import { isString } from '@shared/helpers';
import { isExist } from '@shared/types';

import { checkpoints, MAX_SLIDER_VALUE, SLIDER_STEP } from './constants';
import { percentageToSliderValue } from './helpers';
import styles from './margin-slider.module.scss';

interface SliderThumbProps {
  props: HTMLProps<HTMLDivElement> & { ref: RefCallback<HTMLDivElement> };
  originalValue: number;
}

const SliderThumb: React.FC<SliderThumbProps> = ({ props, originalValue }) => {
  const currentValueLabelRef = useRef<HTMLElement | null>(null);
  const shift = (currentValueLabelRef.current?.getBoundingClientRect()?.width ?? 0) / 2 - 4;
  const leftFromProps = props.style?.left;
  const left = isExist(leftFromProps)
    ? isString(leftFromProps)
      ? `calc(${leftFromProps} - ${shift}px)`
      : leftFromProps - shift
    : undefined;

  return (
    <>
      <span className={cx(styles.thumbValue, styles.customMark)} ref={currentValueLabelRef} style={{ left }}>
        {originalValue} %
      </span>
      <div {...props} aria-valuenow={originalValue} />
    </>
  );
};

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
        renderThumb={(props, state) => <SliderThumb props={props} originalValue={value} />}
        min={0}
        max={MAX_SLIDER_VALUE}
        step={SLIDER_STEP}
        trackClassName={styles.track}
        value={percentageToSliderValue(value)}
        renderTrack={(props, state) => (state.index === 0 ? <div key={state.index} {...props} /> : null)}
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

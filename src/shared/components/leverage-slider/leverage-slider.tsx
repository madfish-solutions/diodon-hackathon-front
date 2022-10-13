import ReactSlider from 'react-slider';

import styles from './leverage-slider.module.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const SLIDER_MARKS = [3, 4, 5, 6, 7, 8, 9];

export const LeverageSlider = ({ value, onChange, disabled }: Props) => (
  <div className={styles.root}>
    <ReactSlider
      className={styles.slider}
      marks={SLIDER_MARKS}
      markClassName={styles.mark}
      onChange={onChange}
      thumbClassName={styles.thumb}
      min={2}
      max={10}
      step={1}
      trackClassName={styles.track}
      value={value}
      renderTrack={(props, state) => (state.index === 0 ? <div key={state.index} {...props} /> : null)}
      disabled={disabled}
    />
    <span className={styles.edgeMark}>2</span>
    <span className={styles.edgeMark}>10</span>
  </div>
);

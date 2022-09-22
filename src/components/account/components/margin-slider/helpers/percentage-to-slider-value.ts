import { checkpoints, MAX_SLIDER_VALUE, SLIDER_STEP, WHOLE_PERCENTAGE } from '../constants';

export const percentageToSliderValue = (percentage: number) => {
  if (percentage >= WHOLE_PERCENTAGE) {
    return MAX_SLIDER_VALUE;
  }

  const intervalsCount = checkpoints.length - 1;
  const sliderIntervalLength = MAX_SLIDER_VALUE / intervalsCount;
  const intervalIndex = checkpoints.findIndex((checkpoint, index) => {
    return checkpoint <= percentage && percentage < checkpoints[index + 1];
  });
  const x0 = checkpoints[intervalIndex];
  const x1 = checkpoints[intervalIndex + 1];
  const y0 = sliderIntervalLength * intervalIndex;
  const y1 = sliderIntervalLength * (intervalIndex + 1);

  const y = y0 + ((percentage - x0) * (y1 - y0)) / (x1 - x0);

  return Math.floor(y / SLIDER_STEP) * SLIDER_STEP;
};

export const sliderValueToPercentage = (sliderValue: number) => {
  if (sliderValue >= MAX_SLIDER_VALUE) {
    return WHOLE_PERCENTAGE;
  }

  const intervalsCount = checkpoints.length - 1;
  const sliderIntervalLength = MAX_SLIDER_VALUE / intervalsCount;
  const intervalIndex = Math.floor(sliderValue / sliderIntervalLength);
  const x0 = sliderIntervalLength * intervalIndex;
  const x1 = sliderIntervalLength * (intervalIndex + 1);
  const y0 = checkpoints[intervalIndex];
  const y1 = checkpoints[intervalIndex + 1];

  const y = y0 + ((sliderValue - x0) * (y1 - y0)) / (x1 - x0);

  return Math.floor(y);
};

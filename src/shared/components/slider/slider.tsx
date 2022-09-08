import { FC } from 'react';

import ReactSlider from 'react-slider';

import { GlobalStyle } from './global-styles';

export const Slider: FC = () => {
  return (
    <div>
      <GlobalStyle />
      <ReactSlider
        className="horizontal-slider"
        min={0}
        step={0.1}
        max={100}
        thumbClassName="example-thumb"
        trackClassName="example-track"
      />
    </div>
  );
};

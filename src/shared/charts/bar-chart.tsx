import { createRef, FC, useEffect } from 'react';

import { ColorType, createChart } from 'lightweight-charts';

import { IChartData } from '@api/positions';

import styles from './bar-chart.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialData = [
  { time: '2018-12-22', value: 320.51 },
  { time: '2018-12-23', value: 310.11 },
  { time: '2018-12-24', value: 270.02 },
  { time: '2018-12-25', value: 270.32 },
  { time: '2018-12-26', value: 250.17 },
  { time: '2018-12-27', value: 280.89 },
  { time: '2018-12-28', value: 250.46 },
  { time: '2018-12-29', value: 230.92 },
  { time: '2018-12-30', value: 220.68 },
  { time: '2019-12-31', value: 220.67 },
  { time: '2019-1-22', value: 320.51 },
  { time: '2019-1-23', value: 310.11 },
  { time: '2019-1-24', value: 270.02 },
  { time: '2019-1-25', value: 270.32 },
  { time: '2019-1-26', value: 250.17 },
  { time: '2019-1-27', value: 280.89 },
  { time: '2019-1-28', value: 250.46 },
  { time: '2019-1-29', value: 230.92 },
  { time: '2019-1-30', value: 220.68 },
  { time: '2019-1-31', value: 220.67 },
  { time: '2019-2-22', value: 320.51 },
  { time: '2019-2-23', value: 310.11 },
  { time: '2019-2-24', value: 270.02 },
  { time: '2019-2-25', value: 270.32 },
  { time: '2019-2-26', value: 2250.17 },
  { time: '2019-2-27', value: 2880.89 },
  { time: '2019-2-28', value: 2500.46 },
  { time: '2019-2-29', value: 1230.92 },
  { time: '2019-2-30', value: 220.68 },
  { time: '2019-2-31', value: 220.67 },
  { time: '2019-3-22', value: 320.51 },
  { time: '2019-3-23', value: 310.11 },
  { time: '2019-3-24', value: 270.02 },
  { time: '2019-3-25', value: 270.32 },
  { time: '2019-3-26', value: 250.17 },
  { time: '2019-3-27', value: 280.89 },
  { time: '2019-3-28', value: 0 },
  { time: '2019-3-29', value: 0 },
  { time: '2019-3-30', value: 220.68 },
  { time: '2019-3-31', value: 220.67 }
];

interface Props {
  data: Array<IChartData>;
}

export const BarChart: FC<Props> = ({ data }) => {
  const backgroundColor = 'rgba(0, 0, 0, 0.2)';
  const textColor = 'rgba(255, 255, 255, 0.64)';
  const chartContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (chartContainerRef === null || chartContainerRef.current === null) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor
      },
      width: chartContainerRef.current.clientWidth,
      height: 264,
      grid: {
        vertLines: {
          visible: false
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.4)'
        }
      },
      timeScale: {
        visible: true,
        secondsVisible: true
      }
    });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    chart.timeScale().fitContent();

    const newSeries = chart.addHistogramSeries({ color: 'rgba(255, 235, 128, 0.3)' });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [backgroundColor, chartContainerRef, data, textColor]);

  return <div className={styles.root} ref={chartContainerRef} />;
};

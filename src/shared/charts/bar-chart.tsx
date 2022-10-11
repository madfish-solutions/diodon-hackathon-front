import { createRef, FC, useEffect } from 'react';

import { ColorType, createChart } from 'lightweight-charts';

import { IChartData } from '@api/positions';

import styles from './bar-chart.module.scss';

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
        timeVisible: true
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

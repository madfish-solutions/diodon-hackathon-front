import { createRef, FC, useEffect } from 'react';

import { ColorType, createChart, PriceScaleMode } from 'lightweight-charts';

import { IChartData } from '@api/positions';

import styles from './bar-chart.module.scss';

interface Props {
  volumeData: Array<IChartData>;
  spotPriceData: Array<IChartData>;
}

export const BarChart: FC<Props> = ({ volumeData, spotPriceData }) => {
  const backgroundColor = 'rgba(0, 0, 0, 0.2)';
  const textColor = 'rgba(255, 255, 255, 0.64)';
  const chartContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (chartContainerRef === null || chartContainerRef.current === null) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.2
        },
        borderVisible: false,
        mode: PriceScaleMode.Logarithmic
      },
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
          color: 'rgba(255, 255, 255, 0.1)'
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

    const lineSeries = chart.addLineSeries({ color: 'rgba(255, 235, 128, 1)' });
    const histogramSeries = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0
      },
      color: 'rgba(255, 235, 128, 0.3)'
    });

    lineSeries.setData(spotPriceData);
    histogramSeries.setData(volumeData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [backgroundColor, chartContainerRef, volumeData, spotPriceData, textColor]);

  return <div className={styles.root} ref={chartContainerRef} />;
};

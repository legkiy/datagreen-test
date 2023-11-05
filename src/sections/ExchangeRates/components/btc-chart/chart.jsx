import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const BtcChart = ({ btcData, ethData }) => {
  const chartData = [
    {
      data: btcData.map((el) => (+el.price).toFixed(2)),
      name: 'BTC',
    },
    {
      data: ethData.map((el) => (+el.price).toFixed(2)),
      name: 'ETH',
    },
  ];

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      categories: btcData.map((el) => el.timestamp * 1000),
      tickAmount: 10,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} $`,
      },
      x: {
        format: 'dd MMM y HH:mm',
      },
    },
  };
  return <ReactApexChart options={options} type="area" series={chartData} height={300} />;
};

BtcChart.propTypes = {
  btcData: PropTypes.array,
  ethData: PropTypes.array,
};

export default memo(BtcChart);

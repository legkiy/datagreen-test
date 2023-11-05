import { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const CoinListChart = ({ coinsListData, coinsListStart, pageOfCoinsListSize }) => {
  const coinsListSplit = useMemo(
    () => coinsListData.slice(coinsListStart, coinsListStart + pageOfCoinsListSize),
    [coinsListData, coinsListStart, pageOfCoinsListSize]
  );
  const chartData = [
    {
      name: 'USD',
      data: coinsListSplit?.map((el) => (+el.price).toFixed(2)),
    },
  ];
  const options = {
    chart: {
      height: 300,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top',
        },
      },
    },
    xaxis: {
      categories: coinsListSplit?.map((el) => el?.symbol),
    },
    dataLabels: {
      enabled: true,
      offsetY: -18,
      style: {
        fontSize: '12px',
        colors: ['#000000'],
      },
    },
  };
  return <ReactApexChart type="bar" options={options} series={chartData} height={300} />;
};

CoinListChart.propTypes = {
  coinsListData: PropTypes.array,
  coinsListStart: PropTypes.number,
  pageOfCoinsListSize: PropTypes.number,
};

export default CoinListChart;

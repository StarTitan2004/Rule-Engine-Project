import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, title }) => {
  const timestamps = data.map((_, index) => index); // Replace with actual timestamps if available
  const values = data.map(packet => (packet.action === 'DENY' ? 1 : 0));

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};

export default LineChart;

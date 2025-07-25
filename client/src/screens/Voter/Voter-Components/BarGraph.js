import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ candidates }) => {
  const colors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(255, 99, 132)',
    'rgba(255, 99, 132)',
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Total Candidates: ${candidates.length}`,
        position: 'top',
      },
    },
  };

  const data = {
    labels: candidates.map((candidate) => candidate.name),
    datasets: [
      {
        label: 'Vote Count',
        data: candidates.map((candidate) => Number(candidate.votecount)),
        backgroundColor: candidates.map((_, index) => colors[index % colors.length]),
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarGraph;
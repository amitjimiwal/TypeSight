import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResultGraph = ({
  graphData,
}: {
  graphData: [number, number, number][];
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Overall Analysis",
        color:'rgb(255, 255, 255)'
      },
    },
  };
  return (
    <div>
      <Line
        options={options}
        data={{
          labels: graphData.map((i) => i[0] + 1),
          datasets: [
            {
              data: graphData.map((i) => i[1]),
              label: "wpm",
              borderColor: "rgb(255,255,0)",
              borderWidth: 1,
            },
            {
              data: graphData.map((i) => i[2]),
              label: "faults",
              backgroundColor: "rgb(128,128,128)",
              borderColor: "rgb(105,105,105)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default ResultGraph;

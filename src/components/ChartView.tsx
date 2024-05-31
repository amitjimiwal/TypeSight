import React, { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import { useResultStatus } from "@/hooks/useAuthStatus";
import { generateChartData } from "@/lib/helpers/generateChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  scoresval: number[];
  accuracyval: number[];
}
export default function App({ type }: { type: string }) {
  const { results } = useResultStatus();
  const [chartdata, setchartdata] = useState<ChartProps>({
    labels: [],
    scoresval: [],
    accuracyval: [],
  });
  useEffect(() => {
    if (results) {
      setchartdata(generateChartData(results));
    }
  }, [results]);
  const data = {
    labels: chartdata.labels,
    datasets: [
      {
        label: type,
        data: type === "Wpm" ? chartdata.scoresval : chartdata.accuracyval,
        borderColor:
          type === "Wpm" ? "rgb(54, 162, 235)" : "rgb(255, 159, 64)",
        backgroundColor:
          type === "Wpm" ? "rgb(54, 162, 235)" : "rgb(255, 159, 64)",
        borderWidth: 1,
      }
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: type,
      },
    },
  };
  return <Line options={options} data={data} />;
}

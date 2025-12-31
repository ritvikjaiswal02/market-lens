import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function PriceChart({ prices }) {
  const data = {
    labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        data: prices.map((p) => p[1]),
        borderColor: "#2563eb",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  return <Line data={data} />;
}

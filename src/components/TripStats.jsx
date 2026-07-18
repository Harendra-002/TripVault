import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TripStats({ trips }) {
  const data = {
    labels: ["Trips", "Places"],
    datasets: [
      {
        data: [
          trips.length,
          new Set(trips.map((t) => t.destination)).size,
        ],
      },
    ],
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <Doughnut data={data} />
    </div>
  );
}

export default TripStats;

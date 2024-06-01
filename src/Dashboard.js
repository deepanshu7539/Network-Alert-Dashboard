import React, { useEffect, useState } from "react";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import "tailwindcss/tailwind.css";
import dummyData from "./dummyData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  RadialLinearScale
);

const Dashboard = () => {
  const [alertCounts, setAlertCounts] = useState([]);
  const [severityDistribution, setSeverityDistribution] = useState([]);
  const [topSourceIps, setTopSourceIps] = useState([]);
  const [topDestPorts, setTopDestPorts] = useState([]);

  useEffect(() => {
    const processedData = processData(dummyData);
    setAlertCounts(processedData.alertCounts);
    setSeverityDistribution(processedData.severityDistribution);
    setTopSourceIps(processedData.topSourceIps);
    setTopDestPorts(processedData.topDestPorts);
  }, []);

  const processData = (data) => {
    const alertCounts = {};
    const severityDistribution = {};
    const topSourceIps = {};
    const topDestPorts = {};

    data.forEach((item) => {
      if (item.event_type !== "alert" || !item.alert) return;

      const date = item.timestamp.split("T")[0];
      if (!alertCounts[date]) {
        alertCounts[date] = 0;
      }
      alertCounts[date]++;

      const severity = item.alert.severity;
      if (!severityDistribution[severity]) {
        severityDistribution[severity] = 0;
      }
      severityDistribution[severity]++;

      const srcIp = item.src_ip;
      if (!topSourceIps[srcIp]) {
        topSourceIps[srcIp] = 0;
      }
      topSourceIps[srcIp]++;

      const destPort = item.dest_port;
      if (!topDestPorts[destPort]) {
        topDestPorts[destPort] = 0;
      }
      topDestPorts[destPort]++;
    });

    return {
      alertCounts: Object.keys(alertCounts).map((date) => ({
        date,
        count: alertCounts[date],
      })),
      severityDistribution: Object.keys(severityDistribution).map(
        (severity) => ({ severity, count: severityDistribution[severity] })
      ),
      topSourceIps: Object.keys(topSourceIps).map((ip) => ({
        ip,
        count: topSourceIps[ip],
      })),
      topDestPorts: Object.keys(topDestPorts).map((port) => ({
        port,
        count: topDestPorts[port],
      })),
    };
  };

  const alertCountsData = {
    labels: alertCounts.map((item) => item.date),
    datasets: [
      {
        label: "Alert Count",
        data: alertCounts.map((item) => item.count),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const severityDistributionData = {
    labels: severityDistribution.map((item) => item.severity),
    datasets: [
      {
        label: "Severity Count",
        data: severityDistribution.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topSourceIpsData = {
    labels: topSourceIps.map((item) => item.ip),
    datasets: [
      {
        label: "Source IP Count",
        data: topSourceIps.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const topDestPortsData = {
    labels: topDestPorts.map((item) => item.port),
    datasets: [
      {
        label: "Destination Port Count",
        data: topDestPorts.map((item) => item.count),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const topSourceAndDestData = {
    labels: [
      ...topSourceIps.map((item) => item.ip),
      ...topDestPorts.map((item) => item.port),
    ],
    datasets: [
      {
        label: "Count",
        data: [
          ...topSourceIps.map((item) => item.count),
          ...topDestPorts.map((item) => item.count),
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white p-5">
      <h1 className="text-2xl mb-5">Network Alert Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Alert Count Over Time</h2>
          <div className="h-64">
            <Line data={alertCountsData} options={chartOptions} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Alert Severity Distribution</h2>
          <div className="h-64">
            <Bar data={severityDistributionData} options={chartOptions} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Top Source IPs</h2>
          <div className="h-64">
            <Bar data={topSourceIpsData} options={chartOptions} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Alerts by Destination Ports</h2>
          <div className="h-64">
            <Bar data={topDestPortsData} options={chartOptions} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">Severity Distribution Pie Chart</h2>
          <div className="h-64">
            <Pie data={severityDistributionData} options={chartOptions} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl mb-2">
            Top Source IPs and Destination Ports Radar Chart
          </h2>
          <div className="h-64">
            <Radar data={topSourceAndDestData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

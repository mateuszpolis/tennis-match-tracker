import React from "react";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadarController,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";
import { Match } from "../../models/Match";
import { mockUser, User } from "../../models/User";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadarController,
  Tooltip,
  Legend
);

function PlayerPage() {
  const user = mockUser;

  const { playerInfo } = user;

  if (!playerInfo) {
    return <div className="p-4 text-center">No player info available.</div>;
  }

  // Helper to determine if the user won the match
  const didPlayerWin = (match: Match, playerId: number) => {
    return match.firstPlayer.id === playerId
      ? match.firstPlayerScore > match.secondPlayerScore
      : match.secondPlayerScore > match.firstPlayerScore;
  };

  // Calculate win percentage
  const totalGames = playerInfo.gameHistory.length;
  const wins = playerInfo.gameHistory.filter((match) =>
    didPlayerWin(match, user.id)
  ).length;
  const losses = totalGames - wins;
  const winPercentage = totalGames > 0 ? (wins / totalGames) * 100 : 0;

  // Prepare chart data for wins over years
  const yearlyStats = playerInfo.gameHistory.reduce((acc, match) => {
    const year = new Date(match.date).getFullYear();
    acc[year] = acc[year] || { wins: 0, losses: 0 };
    if (didPlayerWin(match, user.id)) acc[year].wins += 1;
    else acc[year].losses += 1;
    return acc;
  }, {} as { [year: number]: { wins: number; losses: number } });

  const years = Object.keys(yearlyStats);
  const winData = years.map((year: any) => yearlyStats[year].wins);
  const lossData = years.map((year: any) => yearlyStats[year].losses);

  const barChartData = {
    labels: years,
    datasets: [
      {
        label: "Wins",
        data: winData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Losses",
        data: lossData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Prepare radar chart data for strong and weak points
  const abilityLabels = playerInfo.strongPoints
    .map((point) => point.name)
    .concat(playerInfo.weakPoints.map((point) => point.name));

  const radarChartData = {
    labels: abilityLabels,
    datasets: [
      {
        label: "Strong Points",
        data: playerInfo.strongPoints.map((point) => point.rating),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Weak Points",
        data: playerInfo.weakPoints.map((point) => point.rating),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">
        {user.name} {user.surname}'s Player Page
      </h2>
      <p className="text-lg">Email: {user.email}</p>
      <p className="text-lg">Status: {user.status}</p>
      <p className="text-lg">Role: {user.role}</p>
      <p className="text-lg">
        Active Since: {new Date(playerInfo.activeSince).toDateString()}
      </p>
      <p className="text-lg font-semibold">Total Wins: {wins}</p>
      <p className="text-lg font-semibold">Total Losses: {losses}</p>
      <p className="text-lg font-semibold">
        Win Percentage: {winPercentage.toFixed(2)}%
      </p>

      <h3 className="text-2xl font-bold mt-6">Game History</h3>
      <ul className="list-disc ml-6">
        {playerInfo.gameHistory.map((match, index) => (
          <li key={index} className="my-2">
            {new Date(match.date).toDateString()} -{" "}
            {didPlayerWin(match, user.id) ? "Win" : "Loss"} against{" "}
            {match.firstPlayer.id === user.id
              ? match.secondPlayer.name
              : match.firstPlayer.name}
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-bold mt-6">Performance Over the Years</h3>
      <div className="w-full md:w-3/4 mx-auto my-6">
        <Bar data={barChartData} />
      </div>

      <h3 className="text-2xl font-bold mt-6">
        Player Strengths and Weaknesses
      </h3>
      <div className="w-full md:w-3/4 mx-auto my-6">
        <Radar data={radarChartData} />
      </div>
    </div>
  );
}

export default PlayerPage;

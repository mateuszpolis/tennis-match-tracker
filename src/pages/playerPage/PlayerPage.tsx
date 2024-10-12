import React, { useEffect } from "react";
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
import { User } from "../../models/User";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GameHistory from "./GameHistory";

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
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = React.useState<User | null>(null);
  const { getProfile } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile(parseInt(id!));
        setUser(response);
      } catch (e: any) {
        console.error(e);
      }
    };

    if (!id) {
      navigate("/");
      toast.error("Invalid user id");
    }

    fetchUser();
  }, [getProfile, id]);

  if (!user) {
    return <div className="p-4 text-center">No user info available.</div>;
  }

  const { playerInfo } = user;

  if (!playerInfo) {
    return <div className="p-4 text-center">No player info available.</div>;
  }

  const didPlayerWin = (match: Match, playerId: number) => {
    return match.firstPlayer.id === playerId
      ? match.firstPlayerScore > match.secondPlayerScore
      : match.secondPlayerScore > match.firstPlayerScore;
  };

  const totalGames = playerInfo.gameHistory.length;
  const wins = playerInfo.gameHistory.filter((match) =>
    didPlayerWin(match, user.id)
  ).length;
  const losses = totalGames - wins;
  const winPercentage = totalGames > 0 ? (wins / totalGames) * 100 : 0;

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

  const abilityLabels = playerInfo.playerPower.map((point) => point.name);

  const radarChartData = {
    labels: abilityLabels,
    datasets: [
      {
        label: "Power Rating",
        data: playerInfo.playerPower.map((point) => point.rating),
        backgroundColor: "rgba(61, 52, 139, 0.2)",
        borderColor: "rgba(61, 52, 139, 1)",
        pointBackgroundColor: "rgba(61, 52, 139, 1)",
      },
    ],
  };

  return (
    <div
      className="p-8 w-full space-y-10"
      style={{
        backgroundImage: `url(/player_page_background.webp)`,
      }}
    >
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-4">
        <h2 className="text-5xl font-bold mb-4 text-primary font-display uppercase">
          {user.name} {user.surname}
        </h2>
        <p className="text-lg font-semibold">
          Active Since: {new Date(playerInfo.activeSince).toDateString()}
        </p>
        <p className="text-gray-500">Total Wins: {wins}</p>
        <p className="text-gray-500">Total Losses: {losses}</p>
        <p className="text-gray-500">
          Win Percentage: {winPercentage.toFixed(2)}%
        </p>
      </div>
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-4 flex items-start justify-between space-x-5">
        <div className="w-full">
          <h3 className="text-2xl font-bold font-display">
            Performance Over the Years
          </h3>
          <div className="h-full">
            <Bar data={barChartData} />
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-2xl font-bold font-display">
            Power Rating Compared to Other Players
          </h3>
          <p className="text-gray-500 text-sm">
            Ratings are based only on the direct matches between players. If two
            players have never played against each other, their ratings are not
            compared.
          </p>
          <div className="">
            <Radar data={radarChartData} />
          </div>
        </div>
      </div>

      <GameHistory
        matches={playerInfo.gameHistory}
        didPlayerWin={didPlayerWin}
        playerId={user.id}
      />
    </div>
  );
}

export default PlayerPage;

import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { User } from "../../models/User";
import RankingTable from "./RankingTable";

function RankingPage() {
  const { getRanking } = useUser();
  const [ranking, setRanking] = useState<User[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setRanking(await getRanking());
      } catch (e: any) {
        console.error(e);
      }
    };

    fetchRanking();
  }, []);

  useEffect(() => {
    document.title = `TTM - Ranking`;
  }, []);

  return (
    <div
      className="min-h-[80vh] p-8"
      style={{
        backgroundImage: `url("rankings_page_background.webp")`,
      }}
    >
      <div className="backdrop-blur-sm bg-white bg-opacity-60 overflow-y-scroll max-h-[80vh]">
        <RankingTable ranking={ranking} />
      </div>
    </div>
  );
}

export default RankingPage;

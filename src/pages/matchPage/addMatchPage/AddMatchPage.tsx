import React from "react";
import { Match, MatchCreationAttributes } from "../../../models/Match";
import MatchForm from "../../../forms/MatchForm";
import { useMatch } from "../../../context/MatchContext";

type Props = {
  match: Match | null;
};

function AddMatchPage({ match }: Props) {
  const { createMatch, updateMatch } = useMatch();

  const submitForm = async (data: MatchCreationAttributes): Promise<any> => {
    try {
      if (match) {
        await updateMatch(
          match.id,
          data,
          data.firstPlayerStats,
          data.secondPlayerStats,
        );
      } else {
        await createMatch(data);
      }
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div className="p-8 space-y-2">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold uppercase text-primary">
          {match?.firstPlayer.name + " " + match?.firstPlayer.surname} vs.{" "}
          {match?.secondPlayer.name + " " + match?.secondPlayer.surname}
        </h2>
      </div>
      <MatchForm
        match={match}
        onSubmit={submitForm}
        tournamentGenerated={true}
      />
    </div>
  );
}

export default AddMatchPage;

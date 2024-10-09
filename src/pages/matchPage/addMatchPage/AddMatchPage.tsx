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
        await updateMatch(match.id, data);
      } else {
        await createMatch(data);
      }
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div>
      <MatchForm
        match={match}
        onSubmit={submitForm}
        tournamentGenerated={true}
      />
    </div>
  );
}

export default AddMatchPage;

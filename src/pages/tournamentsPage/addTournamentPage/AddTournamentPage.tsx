import React from "react";
import { TournamentCreationAttributes } from "../../../models/Tournament";
import TournamentForm from "../../../forms/TournamentForm";
import { useTournament } from "../../../context/TournamentContext";

function AddTournamentPage() {
  const { createTournament } = useTournament();

  const submitForm = async (
    data: TournamentCreationAttributes
  ): Promise<any> => {
    try {
      console.log(data);
      await createTournament(data);
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div>
      <TournamentForm onSubmit={submitForm} />
    </div>
  );
}

export default AddTournamentPage;

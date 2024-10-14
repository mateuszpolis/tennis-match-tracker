import React from "react";
import { TournamentCreationAttributes } from "../../../models/Tournament";
import TournamentForm from "../../../forms/TournamentForm";
import { useTournament } from "../../../context/TournamentContext";
import { Link } from "react-router-dom";

function AddTournamentPage() {
  const { createTournament } = useTournament();

  const submitForm = async (
    data: TournamentCreationAttributes
  ): Promise<any> => {
    try {
      await createTournament(data);
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div className="p-8">      
      <TournamentForm onSubmit={submitForm} />
    </div>
  );
}

export default AddTournamentPage;

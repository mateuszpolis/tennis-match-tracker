import React, { useEffect, useState } from "react";
import {
  Tournament,
  TournamentCreationAttributes,
} from "../../../models/Tournament";
import TournamentForm from "../../../forms/TournamentForm";
import { useTournament } from "../../../context/TournamentContext";
import { useParams } from "react-router-dom";

function AddTournamentPage() {
  const { id } = useParams();

  const { createTournament, getTournament, editTournament } = useTournament();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setTournament(await getTournament(Number(id!)));
      } catch (e: any) {
        console.error(e);
      }
    };

    if (id) {
      fetchTournament();
    }
  }, [getTournament, id]);

  const submitForm = async (
    data: TournamentCreationAttributes
  ): Promise<any> => {
    try {
      if (id) {
        await editTournament(Number(id), data);
      } else {
        await createTournament(data);
      }
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div className="p-2 md:p-8">
      <TournamentForm
        onSubmit={submitForm}
        tournament={tournament as TournamentCreationAttributes}
      />
    </div>
  );
}

export default AddTournamentPage;

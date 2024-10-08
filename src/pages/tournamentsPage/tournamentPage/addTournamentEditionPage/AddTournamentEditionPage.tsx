import React, { useEffect } from "react";
import TournamentEditionForm from "../../../../forms/TournamentEditionForm";
import { useTournament } from "../../../../context/TournamentContext";
import { TournamentEditionCreationAttributes } from "../../../../models/TournamentEdition";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  tournamentId: number;
};

function AddTournamentEditionPage({ tournamentId }: Props) {
  const { createTournamentEdition } = useTournament();
  const navigate = useNavigate();

  const submitForm = async (
    data: TournamentEditionCreationAttributes
  ): Promise<any> => {
    try {
      await createTournamentEdition(data);
    } catch (e: any) {
      throw e;
    }
  };

  useEffect(() => {
    if (!tournamentId) {
      toast.error("No tournament selected.");
      navigate(`/tournaments/${tournamentId}`);
    }
  }, []);

  return (
    <div className="mt-10">
      <TournamentEditionForm
        onSubmit={submitForm}
        tournamentId={tournamentId}
      />
    </div>
  );
}

export default AddTournamentEditionPage;

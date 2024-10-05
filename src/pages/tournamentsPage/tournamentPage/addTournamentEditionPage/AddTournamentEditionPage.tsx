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

  const submitForm = async (
    data: TournamentEditionCreationAttributes
  ): Promise<any> => {
    try {
      await createTournamentEdition(data);
    } catch (e: any) {
      throw e;
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!tournamentId) {
      toast.error("No tournament selected.");
      navigate("/tournaments");
    }
  }, []);

  return (
    <div>
      <TournamentEditionForm
        onSubmit={submitForm}
        tournamentId={tournamentId}
      />
    </div>
  );
}

export default AddTournamentEditionPage;

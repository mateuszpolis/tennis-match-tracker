import React, { useEffect } from "react";
import TournamentEditionForm from "../../../../forms/TournamentEditionForm";
import { useTournament } from "../../../../context/TournamentContext";
import {
  TournamentEdition,
  TournamentEditionCreationAttributes,
} from "../../../../models/TournamentEdition";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

function AddTournamentEditionPage() {
  const { year, id } = useParams();

  const navigate = useNavigate();

  const {
    createTournamentEdition,
    getTournamentEdition,
    editTournamentEdition,
  } = useTournament();
  const [edition, setEdition] = React.useState<TournamentEdition | null>(null);

  const submitForm = async (
    data: TournamentEditionCreationAttributes
  ): Promise<any> => {
    try {
      if (edition) {
        await editTournamentEdition(Number(year!), Number(id!), data);
      } else {
        await createTournamentEdition(data);
      }
    } catch (e: any) {
      throw e;
    }
  };

  useEffect(() => {
    const fetchEdition = async () => {
      try {
        setEdition(await getTournamentEdition(Number(id), Number(year)));
      } catch (e: any) {
        console.error(e);
      }
    };

    if (!id) {
      toast.error("No tournament selected.");
      navigate(`/tournaments/${id}`);
    }

    if (id && year) {
      fetchEdition();
    }
  }, [getTournamentEdition, id, navigate, year]);

  return (
    <div className="mt-10 p-2 bg-white bg-opacity-80 backdrop-blur-md flex flex-col items-start space-y-3">
      <IconButton
        onClick={() => {
          if (year) {
            navigate(`/tournaments/${id}/edition/${year}`);
          } else {
            navigate(`/tournaments/${id}`);
          }
        }}
      >
        <ArrowBack />
      </IconButton>
      <TournamentEditionForm
        onSubmit={submitForm}
        tournamentId={Number(id!)}
        edition={edition as TournamentEditionCreationAttributes}
      />
    </div>
  );
}

export default AddTournamentEditionPage;

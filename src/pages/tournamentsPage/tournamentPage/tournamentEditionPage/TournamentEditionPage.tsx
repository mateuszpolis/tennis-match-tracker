import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TournamentEdition } from "../../../../models/TournamentEdition";
import { useTournament } from "../../../../context/TournamentContext";
import { toast } from "react-toastify";
import { CalendarToday } from "@mui/icons-material";
import { useAuth } from "../../../../context/AuthContext";
import TournamentTable from "./TournamentTable";
import TournamentMatches from "./TournamentMatches";
import TournamentBracket from "./TournamentBracket";
import { UserRole } from "../../../../models/User";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Props = {
  tournamentId: number;
};

function TournamentEditionPage({ tournamentId }: Props) {
  const { year } = useParams();
  const [tournamentEdition, setTournamentEdition] =
    useState<TournamentEdition | null>(null);

  const {
    getTournamentEdition,
    signupForTournament,
    closeRegistration,
    deleteTournamentEdition,
  } = useTournament();

  const signup = async () => {
    const toastId = toast.loading("Signing up...");
    try {
      await signupForTournament(tournamentEdition!.id);

      toast.update(toastId, {
        render: "Signed up successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchEdition();
    } catch (e: any) {
      toast.update(toastId, {
        render: e.response.data.message || "Failed to sign up",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const startTournament = async () => {
    const toastId = toast.loading("Starting tournament...");
    try {
      await closeRegistration(tournamentEdition!.id);

      toast.update(toastId, {
        render: "Tournament started successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchEdition();
    } catch (e: any) {
      toast.update(toastId, {
        render: e.response.data.message || "Failed to start tournament",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const removeEdition = async () => {
    const toastId = toast.loading("Removing tournament edition...");
    try {
      await deleteTournamentEdition(tournamentEdition!.id);

      toast.update(toastId, {
        render: "Tournament edition removed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/tournaments/${tournamentId}`);
    } catch (e: any) {
      toast.update(toastId, {
        render:
          e.response.data.message || "Failed to remove tournament edition",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const showRemoveConfirmation = () => {
    confirmAlert({
      title: "Confirm to remove",
      message: "Are you sure you want to remove this tournament edition?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeEdition(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const fetchEdition = async () => {
    try {
      setTournamentEdition(
        await getTournamentEdition(tournamentId, Number(year!))
      );
    } catch (e: any) {
      toast.error("Failed to fetch tournament edition.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!year) {
      navigate(`/tournaments/${tournamentId}`);
    }
    fetchEdition();
  }, []);

  const { user, isAuthenticated } = useAuth();

  if (!tournamentEdition) {
    return <div>Loading...</div>;
  }

  const isUpcomingEvent = new Date(tournamentEdition.startDate) >= new Date();

  return (
    <div className="mt-10">
      <div className="space-y-2 bg-white bg-opacity-70 backdrop-blur-md p-4 mb-10">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold">
            {tournamentEdition.editionName || ""}{" "}
            {tournamentEdition.tournament?.name} {tournamentEdition.year}
          </h2>
          {isUpcomingEvent &&
            tournamentEdition.registrationOpen &&
            isAuthenticated && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={signup}
                  className="p-4 text-background rounded-md bg-primary hover:bg-accent active:bg-primary w-fit hover:text-background font-semibold uppercase transition-all"
                >
                  Sign up for the event
                </button>

                {(user?.role === UserRole.Admin ||
                  user?.role === UserRole.Moderator) && (
                  <>
                    <button
                      onClick={startTournament}
                      className="p-4 text-background rounded-md bg-secondary hover:bg-accent active:bg-primary w-fit hover:text-background font-semibold uppercase transition-all"
                    >
                      Close registration
                    </button>

                    <button
                      onClick={showRemoveConfirmation}
                      className="p-4 text-background rounded-md bg-red-500 hover:bg-red-700 active:bg-red-600 w-fit hover:text-background font-semibold uppercase transition-all"
                    >
                      Remove Tournament Edition
                    </button>
                  </>
                )}
              </div>
            )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <CalendarToday />
            <div>
              <span>
                {new Date(tournamentEdition.startDate).toLocaleDateString(
                  "pl-PL"
                )}
              </span>
              <span>-</span>
              <span>
                {new Date(tournamentEdition.endDate).toLocaleDateString(
                  "pl-PL"
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span>No. of contestants:</span>
            <span
              className={`${
                tournamentEdition.registrationOpen ? "text-green-600" : ""
              }`}
            >
              {tournamentEdition.currentNumberOfContestants}
            </span>
            <span>/</span>
            <span>{tournamentEdition.maximumNumberOfContestants}</span>
          </div>
        </div>
      </div>
      <TournamentBracket tournamentEdition={tournamentEdition} />
      <TournamentTable players={tournamentEdition.players!} />
      <TournamentMatches tournamentEdition={tournamentEdition} />
    </div>
  );
}

export default TournamentEditionPage;

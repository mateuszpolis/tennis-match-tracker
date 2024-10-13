import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";
import { Tournament, TournamentCreationAttributes } from "../models/Tournament";
import { withAuth } from "../middleware/withAuth";
import {
  TournamentEdition,
  TournamentEditionCreationAttributes,
} from "../models/TournamentEdition";
import { Surface } from "../models/TennisGround";

interface TournamentContextType {
  createTournament: (data: TournamentCreationAttributes) => Promise<void>;
  editTournament: (
    id: number,
    data: Partial<TournamentCreationAttributes>
  ) => Promise<void>;
  deleteTournament: (id: number) => Promise<void>;
  fetchTournaments: (filters?: any) => Promise<Tournament[]>;
  getTournament: (id: number) => Promise<Tournament>;
  createTournamentEdition: (
    data: TournamentEditionCreationAttributes
  ) => Promise<void>;
  editTournamentEdition: (
    year: number,
    tournamentId: number,
    data: Partial<TournamentEdition>
  ) => Promise<void>;
  getTournamentEditions: (filters?: {
    namne?: string;
    groundId?: number;
    surface?: Surface;
    sortByStartDate?: "asc" | "desc";
    sortByEndDate?: "asc" | "desc";
    startDateAfter?: Date;
    isFinished?: "yes" | "no" | "all";
  }) => Promise<TournamentEdition[]>;
  getTournamentEdition: (
    tournamentId: number,
    year: number
  ) => Promise<TournamentEdition>;
  signupForTournament: (tournamentEditionId: number) => Promise<any>;
  closeRegistration: (tournamentEditionId: number) => Promise<any>;
  deleteTournamentEdition: (tournamentEditionId: number) => Promise<void>;
  getTournamentEditionsForUser: (
    userId: number
  ) => Promise<TournamentEdition[]>;
  queryTournaments: (query: string) => Promise<{
    tournaments: Tournament[];
    tournamentEditions: TournamentEdition[];
  }>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(
  undefined
);

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
};

const TournamentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const createTournament = async (
    data: TournamentCreationAttributes
  ): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/create`,
      data,
    });

    await axios(config);
  };

  const editTournament = async (
    id: number,
    data: Partial<TournamentCreationAttributes>
  ): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/edit`,
      data: { id, ...data },
    });

    await axios(config);
  };

  const deleteTournament = async (id: number): Promise<void> => {
    const config = await withAuth({
      method: "delete",
      url: `${apiUrl}/api/tournaments/delete/${id}`,
    });

    await axios(config);
  };

  const queryTournaments = async (query: string) => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/query`,
      params: {
        query,
      },
    };

    const response = await axios(config);
    return response.data;
  };

  const deleteTournamentEdition = async (
    tournamentEditionId: number
  ): Promise<void> => {
    const config = await withAuth({
      method: "delete",
      url: `${apiUrl}/api/tournaments/delete/edition/${tournamentEditionId}`,
    });

    await axios(config);
  };

  const fetchTournaments = async (filters?: any): Promise<Tournament[]> => {
    const config = await withAuth({
      method: "get",
      url: `${apiUrl}/api/tournaments/filter`,
      params: filters,
    });

    const response = await axios(config);
    return response.data;
  };

  const getTournamentEditionsForUser = async (
    userId: number
  ): Promise<TournamentEdition[]> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/edition/user/${userId}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const getTournament = async (id: number): Promise<Tournament> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/one/${id}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const createTournamentEdition = async (
    data: TournamentEditionCreationAttributes
  ): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/create/edition`,
      data,
    });

    await axios(config);
  };

  const editTournamentEdition = async (
    year: number,
    tournamentId: number,
    data: Partial<TournamentEdition>
  ): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/edit/edition`,
      data: { year, tournamentId, ...data },
    });

    await axios(config);
  };

  const getTournamentEditions = async (filters?: any): Promise<any> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/edition/filter`,
      params: filters,
    };

    const response = await axios(config);
    return response.data;
  };

  const getTournamentEdition = async (
    tournamentId: number,
    year: number
  ): Promise<TournamentEdition> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/edition/one`,
      params: {
        tournamentId,
        year,
      },
    };

    const response = await axios(config);
    return response.data;
  };

  const signupForTournament = async (
    tournamentEditionId: number
  ): Promise<any> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/edition/signup`,
      data: {
        tournamentEditionId,
      },
    });

    await axios(config);
  };

  const closeRegistration = async (
    tournamentEditionId: number
  ): Promise<any> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/tournaments/edition/start`,
      data: {
        tournamentEditionId,
      },
    });

    await axios(config);
  };

  return (
    <TournamentContext.Provider
      value={{
        createTournament,
        queryTournaments,
        getTournamentEditionsForUser,
        editTournament,
        deleteTournament,
        fetchTournaments,
        getTournament,
        createTournamentEdition,
        editTournamentEdition,
        getTournamentEditions,
        getTournamentEdition,
        signupForTournament,
        closeRegistration,
        deleteTournamentEdition,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;

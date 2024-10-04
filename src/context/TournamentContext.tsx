import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";
import { Tournament, TournamentCreationAttributes } from "../models/Tournament";
import { withAuth } from "../middleware/withAuth";
import { TournamentEdition } from "../models/TournamentEdition";

interface TournamentContextType {
  createTournament: (data: TournamentCreationAttributes) => Promise<void>;
  editTournament: (
    id: number,
    data: Partial<TournamentCreationAttributes>
  ) => Promise<void>;
  deleteTournament: (id: number) => Promise<void>;
  fetchTournaments: (filters?: any) => Promise<Tournament[]>;
  getTournament: (id: number) => Promise<Tournament>;
  createTournamentEdition: (data: TournamentEdition) => Promise<void>;
  editTournamentEdition: (
    year: number,
    tournamentId: number,
    data: Partial<TournamentEdition>
  ) => Promise<void>;
  getTournamentEditions: (filters?: any) => Promise<TournamentEdition[]>;
  getTournamentEdition: (id: number) => Promise<TournamentEdition>;
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

  const fetchTournaments = async (filters?: any): Promise<Tournament[]> => {
    const config = await withAuth({
      method: "get",
      url: `${apiUrl}/api/tournaments/filter`,
      params: filters,
    });

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
    data: TournamentEdition
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
      url: `${apiUrl}/api/tournaments/filter/edition`,
      params: filters,
    };

    const response = await axios(config);
    return response.data;
  };

  const getTournamentEdition = async (id: number): Promise<any> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/tournaments/one/edition/${id}`,
    };

    const response = await axios(config);
    return response.data;
  };

  return (
    <TournamentContext.Provider
      value={{
        createTournament,
        editTournament,
        deleteTournament,
        fetchTournaments,
        getTournament,
        createTournamentEdition,
        editTournamentEdition,
        getTournamentEditions,
        getTournamentEdition,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentProvider;

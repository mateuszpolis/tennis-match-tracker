import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";
import { Match, MatchCreationAttributes } from "../models/Match";
import { withAuth } from "../middleware/withAuth";

interface MatchContextType {
  getMatch: (id: number) => Promise<Match>;
  createMatch: (data: MatchCreationAttributes) => Promise<void>;
  updateMatch: (id: number, data: MatchCreationAttributes) => Promise<void>;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
};

const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getMatch = async (id: number): Promise<Match> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/matches/${id}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const createMatch = async (data: MatchCreationAttributes): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/matches/create`,
      data,
    });

    await axios(config);
  };

  const updateMatch = async (
    id: number,
    data: MatchCreationAttributes
  ): Promise<void> => {
    const config = await withAuth({
      method: "put",
      url: `${apiUrl}/api/matches/edit`,
      data: { id, ...data },
    });

    await axios(config);
  };

  return (
    <MatchContext.Provider
      value={{
        getMatch,
        createMatch,
        updateMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export default MatchProvider;

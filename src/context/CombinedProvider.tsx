import React, { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import TennisGroundProvider from "./TennisGroundContext";
import TournamentProvider from "./TournamentContext";

interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TennisGroundProvider>
        <TournamentProvider>{children}</TournamentProvider>
      </TennisGroundProvider>
    </AuthProvider>
  );
};

export default CombinedProvider;

import React, { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import TennisGroundProvider from "./TennisGroundContext";
import TournamentProvider from "./TournamentContext";
import UserProvider from "./UserContext";
import MatchProvider from "./MatchContext";

interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TennisGroundProvider>
        <MatchProvider>
          <UserProvider>
            <TournamentProvider>{children}</TournamentProvider>
          </UserProvider>
        </MatchProvider>
      </TennisGroundProvider>
    </AuthProvider>
  );
};

export default CombinedProvider;

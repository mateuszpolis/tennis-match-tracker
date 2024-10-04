import React, { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import TennisGroundProvider from "./TennisGroundContext";

interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TennisGroundProvider>{children}</TennisGroundProvider>
    </AuthProvider>
  );
};

export default CombinedProvider;

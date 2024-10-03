import React, { ReactNode } from "react";
import AuthProvider from "./AuthContext";

interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default CombinedProvider;

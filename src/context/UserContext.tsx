import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";
import { User } from "../models/User";
import { withAuth } from "../middleware/withAuth";

interface UserContextType {
  getUsersByQuery: (query: string, limit: number) => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  getRanking: () => Promise<User[]>;
  getProfile: (id: number) => Promise<User>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const getUsersByQuery = async (
    query: string,
    limit: number
  ): Promise<User[]> => {
    const config = await withAuth({
      method: "get",
      url: `${apiUrl}/api/users/search`,
      params: {
        query,
        limit,
      },
    });

    const response = await axios(config);
    return response.data;
  };

  const getUserById = async (id: number): Promise<User> => {
    const config = await withAuth({
      method: "get",
      url: `${apiUrl}/api/users/one/${id}`,
    });

    const response = await axios(config);
    return response.data;
  };

  const getProfile = async (id: number): Promise<User> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/users/profile/${id}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const getRanking = async (): Promise<User[]> => {
    const config = await withAuth({
      method: "get",
      url: `${apiUrl}/api/users/ranking`,
    });

    const response = await axios(config);
    return response.data;
  };

  return (
    <UserContext.Provider
      value={{
        getUsersByQuery,
        getProfile,
        getRanking,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

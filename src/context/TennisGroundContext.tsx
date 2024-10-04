import React, { createContext, useContext, ReactNode } from "react";
import axios from "axios";
import {
  TennisGround,
  TennisGroundCreationAttributes,
} from "../models/TennisGround";
import { withAuth } from "../middleware/withAuth";

interface TennisGroundContextType {
  createGround: (data: TennisGroundCreationAttributes) => Promise<void>;
  editGround: (
    id: number,
    data: Partial<TennisGroundCreationAttributes>
  ) => Promise<void>;
  deleteGround: (id: number) => Promise<void>;
  fetchGrounds: () => Promise<TennisGround[]>;
  getGround: (id: number) => Promise<TennisGround>;
  getGroundsByName: (name: string) => Promise<TennisGround[]>;
}

const TennisGroundContext = createContext<TennisGroundContextType | undefined>(
  undefined
);

export const useTennisGround = () => {
  const context = useContext(TennisGroundContext);
  if (!context) {
    throw new Error(
      "useTennisGround must be used within a TennisGroundProvider"
    );
  }
  return context;
};

const TennisGroundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const createGround = async (
    data: TennisGroundCreationAttributes
  ): Promise<void> => {
    const config = await withAuth({
      method: "post",
      url: `${apiUrl}/api/grounds/create`,
      data,
    });

    await axios(config);
  };

  const getGround = async (id: number): Promise<TennisGround> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/grounds/${id}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const getGroundsByName = async (name: string): Promise<TennisGround[]> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/grounds/name/${name}`,
    };

    const response = await axios(config);
    return response.data;
  };

  const editGround = async (
    id: number,
    data: Partial<TennisGroundCreationAttributes>
  ): Promise<void> => {
    const config = await withAuth({
      method: "put",
      url: `${apiUrl}/api/grounds/edit`,
      data: { id, ...data },
    });

    await axios(config);
  };

  const deleteGround = async (id: number): Promise<void> => {
    const config = await withAuth({
      method: "delete",
      url: `${apiUrl}/api/grounds/delete/${id}`,
    });

    await axios(config);
  };

  const fetchGrounds = async (): Promise<TennisGround[]> => {
    const config = {
      method: "get",
      url: `${apiUrl}/api/grounds`,
    };

    const response = await axios(config);
    return response.data;
  };

  return (
    <TennisGroundContext.Provider
      value={{
        createGround,
        getGround,
        getGroundsByName,
        editGround,
        deleteGround,
        fetchGrounds,
      }}
    >
      {children}
    </TennisGroundContext.Provider>
  );
};

export default TennisGroundProvider;

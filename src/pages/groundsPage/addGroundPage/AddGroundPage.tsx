import React from "react";
import { TennisGroundCreationAttributes } from "../../../models/TennisGround";
import TennisGroundForm from "../../../forms/TennisGroundForm";
import { useTennisGround } from "../../../context/TennisGroundContext";

function AddGroundPage() {
  const { createGround } = useTennisGround();

  const submitForm = async (
    data: TennisGroundCreationAttributes
  ): Promise<any> => {
    try {
      await createGround(data);
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div>
      <TennisGroundForm onSubmit={submitForm} />
    </div>
  );
}

export default AddGroundPage;

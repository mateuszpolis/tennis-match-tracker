import React from "react";
import TournamentForm from "../../../forms/TournamentForm";
import { TournamentCreationAttributes } from "../../../models/Tournament";

function AddTournamentPage() {
  const submitForm = (data: TournamentCreationAttributes): Promise<any> => {
    return new Promise((resolve) => {
      console.log("Mock submitForm called with:", data);
      setTimeout(() => {
        resolve({ message: "Tournament created successfully" });
      }, 1000);
    });
  };

  return (
    <div>
      <TournamentForm onSubmit={submitForm} />
    </div>
  );
}

export default AddTournamentPage;

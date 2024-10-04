import React from "react";
import { Route, Routes } from "react-router-dom";
import TournamentList from "./TournamentList";
import PrivateRoute from "../../components/global/PrivateRoute";
import AddTournamentPage from "./addTournamentPage/AddTournamentPage";

function TournamentsPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TournamentList />} />
        <Route
          path="/add"
          element={
            // <PrivateRoute>
            <AddTournamentPage />
            // </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default TournamentsPage;

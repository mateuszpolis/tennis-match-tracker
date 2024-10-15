import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import TournamentList from "./TournamentList";
import PrivateRoute from "../../components/global/PrivateRoute";
import AddTournamentPage from "./addTournamentPage/AddTournamentPage";
import TournamentPage from "./tournamentPage/TournamentPage";
import { UserRole } from "../../models/User";

function TournamentsPage() {
  useEffect(() => {
    document.title = `TTM - Tournaments`;
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<TournamentList />} />
        <Route path="/:id/*" element={<TournamentPage />} />
        <Route
          path="/add"
          element={
            <PrivateRoute checkRole={UserRole.Admin}>
              <AddTournamentPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default TournamentsPage;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GroundsList from "./GroundsList";
import AddGroundPage from "./addGroundPage/AddGroundPage";
import GroundPage from "./groundPage/GroundPage";
import PrivateRoute from "../../components/global/PrivateRoute";
import { UserRole } from "../../models/User";

function GroundsPage() {
  useEffect(() => {
    document.title = `TTM - Grounds`;
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<GroundsList />} />
        <Route path="/:id/*" element={<GroundPage />} />
        <Route
          path="/add"
          element={
            <PrivateRoute checkRole={UserRole.Admin}>
              <AddGroundPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default GroundsPage;

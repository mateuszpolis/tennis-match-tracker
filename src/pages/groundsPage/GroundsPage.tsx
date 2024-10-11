import React from "react";
import { Route, Routes } from "react-router-dom";
import GroundsList from "./GroundsList";
import AddGroundPage from "./addGroundPage/AddGroundPage";
import GroundPage from "./groundPage/GroundPage";

function GroundsPage() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<GroundsList />} />
        <Route path="/:id" element={<GroundPage />} />
        <Route
          path="/add"
          element={
            // <PrivateRoute>
            <AddGroundPage />
            // </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default GroundsPage;

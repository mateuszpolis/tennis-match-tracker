import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-8">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2 text-primary">
          <h2 className="text-2xl font-bold font-display">Hi, {user?.name}</h2>
          <WavingHandIcon />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;

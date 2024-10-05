import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Hi, {user?.name}</h2>
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
  );
}

export default ProfilePage;

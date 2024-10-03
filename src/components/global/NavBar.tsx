import React from "react";
import { useAuth } from "../../context/AuthContext";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Login, Person } from "@mui/icons-material";

function NavBar() {
  const width = window.innerWidth;

  const { isAuthenticated } = useAuth();

  return (
    <div className="sticky w-full top-0 bg-white py-3 z-20 max-h-[136px] overflow-visible flex flex-col items-center p-4 ml-auto mr-auto shadow-md">
      <div className="max-w-screen-2xl w-full">
        <div className="w-full flex items-center justify-between space-x-1">
          <div></div>
          <div>
            {isAuthenticated ? (
              <IconButton
                component={Link}
                to={"/profile"}
                aria-label="profile"
                color="primary"
              >
                <Person sx={{ fontSize: width <= 768 ? 25 : 40 }} />
              </IconButton>
            ) : (
              <IconButton
                component={Link}
                to={"/login"}
                aria-label="login"
                color="primary"
              >
                <Login sx={{ fontSize: width <= 768 ? 25 : 40 }} />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

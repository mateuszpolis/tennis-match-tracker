import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Login, Person } from "@mui/icons-material";

function NavBar() {
  const width = window.innerWidth;

  const { isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <div
      className={`sticky w-full top-0 py-3 z-20 max-h-[136px] overflow-visible flex group flex-col items-center p-4 ml-auto mr-auto transition-all ${
        isScrolled ? "shadow-md bg-white" : "bg-background"
      }`}
    >
      <div className="max-w-screen-2xl w-full">
        <div className="w-full flex items-center justify-between space-x-1">
          <div>
            <IconButton
              component={Link}
              to={"/"}
              aria-label="home"
              color="primary"
            >
              <Home sx={{ fontSize: width <= 768 ? 25 : 40 }} />
            </IconButton>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/tournaments"
              className="hover:underline hover:text-primary text-lg font-bold hover:decoration-primary transition-all"
            >
              Tournaments
            </Link>
            <Link
              to="/tennis-grounds"
              className="hover:underline hover:text-primary text-lg font-bold hover:decoration-primary transition-all"
            >
              Tennis Grounds
            </Link>
          </div>
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

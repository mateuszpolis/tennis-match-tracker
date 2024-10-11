import { CloseOutlined, Login, Menu, Person } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  width: number;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Links({ isAuthenticated, width, setIsMenuOpen }: Props) {
  return (
    <div
      className={`flex items-center ${
        width <= 768 ? "flex-col-reverse space-y-4" : "flex-row space-x-4"
      }`}
    >
      <div
        className={`flex uppercase ${
          width <= 768
            ? "flex-col space-y-2 items-end w-full"
            : "flex-row items-center space-x-2 divide-x"
        }`}
      >
        <Link
          onClick={() => setIsMenuOpen(false)}
          to="/rankings"
          className="px-2 hover:drop-shadow-lg text-primary sm:text-xl text-2xl font-bold font-display transition-all"
        >
          Rankings
        </Link>
        <Link
          onClick={() => setIsMenuOpen(false)}
          to="/tournaments"
          className="px-2 hover:drop-shadow-lg text-primary sm:text-xl text-2xl font-bold font-display transition-all"
        >
          Tournaments
        </Link>
        <Link
          onClick={() => setIsMenuOpen(false)}
          to="/tennis-grounds"
          className="px-2 hover:drop-shadow-lg text-primary sm:text-xl text-2xl font-bold font-display transition-all"
        >
          Tennis Grounds
        </Link>
      </div>
      <div
        className={`${
          width <= 768 ? "w-full flex items-center justify-between" : ""
        }`}
      >
        {width <= 768 && (
          <IconButton onClick={() => setIsMenuOpen(false)}>
            <CloseOutlined sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        {isAuthenticated ? (
          <IconButton
            component={Link}
            to={"/profile"}
            aria-label="profile"
            color="primary"
          >
            <Person sx={{ fontSize: 40 }} />
          </IconButton>
        ) : (
          <IconButton
            component={Link}
            to={"/login"}
            aria-label="login"
            color="primary"
          >
            <Login sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Links;

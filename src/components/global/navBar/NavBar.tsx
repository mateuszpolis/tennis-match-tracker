import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { CloseOutlined, Home, Menu } from "@mui/icons-material";
import Links from "./Links";
import { animated, useSpring } from "react-spring";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slideStyle = useSpring({
    transform: isMenuOpen ? "translateX(0%)" : "translateX(100%)",
    config: { tension: 300, friction: 40 },
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <div
      className={`sticky w-full top-0 py-3 z-20 max-h-[136px] overflow-visible flex group backdrop-blur-md flex-col items-center p-4 ml-auto mr-auto transition-all ${
        isScrolled ? "shadow-md bg-transparent" : "bg-background"
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
              <Home sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
          <div>
            {width <= 768 && (
              <IconButton onClick={() => setIsMenuOpen(true)}>
                <Menu sx={{ fontSize: 40 }} />
              </IconButton>
            )}
            {width > 768 ? (
              <Links
                isAuthenticated={isAuthenticated}
                width={width}
                setIsMenuOpen={setIsMenuOpen}
              />
            ) : (
              <animated.div
                className="w-[400px] max-w-[80vw]"
                ref={menuRef}
                style={{
                  ...slideStyle,
                  position: "fixed",
                  zIndex: 1000,
                  padding: "1rem",
                  right: 0,
                  top: 0,
                  height: "100vh",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                }}
              >    
                <Links
                  isAuthenticated={isAuthenticated}
                  width={width}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </animated.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

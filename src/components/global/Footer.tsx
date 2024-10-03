import React from "react";

function Footer() {
  return (
    <footer className="footer p-5 mt-10 text-sm">
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Mateusz Polis
      </div>
    </footer>
  );
}

export default Footer;

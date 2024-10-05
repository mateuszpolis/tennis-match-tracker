import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import muiTheme from "./muiTheme";
import CombinedProvider from "./context/CombinedProvider";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import ForgotPasswordPage from "./pages/forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/resetPasswordPage/ResetPasswordPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ConfirmEmailPage from "./pages/confirmEmailPage/ConfirmEmailPage";
import { ToastContainer } from "react-toastify";
import Footer from "./components/global/Footer";
import NavBar from "./components/global/NavBar";
import TournamentPage from "./pages/tournamentsPage/tournamentPage/TournamentPage";
import "react-toastify/dist/ReactToastify.css";
import MatchPage from "./pages/matchPage/MatchPage";
import PlayerPage from "./pages/playerPage/PlayerPage";
import TournamentsPage from "./pages/tournamentsPage/TournamentsPage";
import GroundsPage from "./pages/groundsPage/GroundsPage";
import Cookies from "./components/global/Cookies";
import ProfilePage from "./pages/profilePage/ProfilePage";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CombinedProvider>
        <Cookies />
        <NavBar />
        <div className="p-4 ml-auto mr-auto w-full max-w-screen-2xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/confirm-email/:token"
              element={<ConfirmEmailPage />}
            />
            <Route path="/match/:id" element={<MatchPage />} />
            <Route path="/player/:id" element={<PlayerPage />} />
            <Route path="/tournaments/*" element={<TournamentsPage />} />
            <Route path="/tennis-grounds/*" element={<GroundsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </CombinedProvider>
    </ThemeProvider>
  );
}

export default App;

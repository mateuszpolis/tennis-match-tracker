import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Cookies } from "react-cookie-consent";
import LoginForm from "../../forms/LoginForm";

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.title = `Eltimex - Logowanie`;
  }, []);

  const cookieConsent = Cookies.get("zgoda_na_cookies");

  return (
    <div className="w-full flex flex-col items-center">
      {cookieConsent !== "true" && (
        <p className="text-gray-500">
          Wyraź zgodę na pliki cookies, aby korzystać z logowania (po akceptacji
          odśwież stronę)
        </p>
      )}
      <h1 className="text-3xl font-bold mb-4">Logowanie</h1>
      <div className="max-w-4xl w-full">
        <LoginForm />
      </div>
      <Link to="/register" className="mt-4 underline">
        {" "}
        Nie masz konta? Zarejestruj się!
      </Link>
      <Link to="/forgot-password" className="mt-4 underline">
        {" "}
        Zapomniałeś hasła?
      </Link>
    </div>
  );
}

export default LoginPage;

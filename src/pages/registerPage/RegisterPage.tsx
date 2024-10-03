import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../forms/RegisterForm";

function RegisterPage() {
  useEffect(() => {
    document.title = `Eltimex - Rejestracja`;
  }, []);

  const environment = process.env.NODE_ENV;

  return (
    <div className="w-full flex flex-col items-center">
      {environment === "production" && (
        <p className="text-gray-500">Rejestracja jest obecnie niedostępna.</p>
      )}
      <h1 className="text-3xl font-bold mb-4">Rejestracja</h1>
      <div className="max-w-4xl w-full">
        <RegisterForm />
      </div>
      <Link to="/login" className="mt-4 underline">
        {" "}
        Masz konto? Zaloguj się!
      </Link>
    </div>
  );
}

export default RegisterPage;

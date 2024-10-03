import React from "react";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../forms/ForgotPasswordForm";

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Zmiana hasła</h1>
      <div className="max-w-4xl w-full space-y-4">
        {submitted ? (
          <div>
            <p className="text-green-500">
              Link do zresetowania hasła został wysłany na podany adres email
            </p>
            <Link to="/login" className="underline">
              Wróć do logowania
            </Link>
          </div>
        ) : (
          <div>
            <p>
              Podaj adres email, na który wyślemy link do zresetowania hasła
            </p>
            <ForgotPasswordForm setSubmitted={setSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

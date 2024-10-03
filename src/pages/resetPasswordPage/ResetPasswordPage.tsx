import React from "react";
import { Link, useParams } from "react-router-dom";
import ResetPasswordForm from "../../forms/ResetPasswordForm";


function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Ustaw nowe hasło</h1>
      <div className="max-w-4xl w-full space-y-4">
        {submitted ? (
          <div>
            <p className="text-green-500">
              Hasło zostało zresetowane. Możesz się teraz zalogować
            </p>
            <Link to="/login" className="underline">
              Wróć do logowania
            </Link>
          </div>
        ) : (
          <div>
            <ResetPasswordForm token={token!} setSubmitted={setSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;

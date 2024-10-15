import React from "react";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../forms/ForgotPasswordForm";

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Change password</h1>
      <div className="max-w-4xl w-full space-y-4">
        {submitted ? (
          <div>
            <p className="text-green-500">
              Reset password link has been sent to your email
            </p>
            <Link to="/login" className="underline">
              Back to login
            </Link>
          </div>
        ) : (
          <div>
            <p>
              Enter your email address and we will send you a link to reset your
              password
            </p>
            <ForgotPasswordForm setSubmitted={setSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

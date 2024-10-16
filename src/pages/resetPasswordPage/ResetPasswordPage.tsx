import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ResetPasswordForm from "../../forms/ResetPasswordForm";

function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  const [submitted, setSubmitted] = React.useState(false);
  
  useEffect(() => {
    document.title = `TTM - Reset Password`;
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Set new password</h1>
      <div className="max-w-4xl w-full space-y-4">
        {submitted ? (
          <div>
            <p className="text-green-500">
              Password has been successfully changed
            </p>
            <Link to="/login" className="underline">
              Back to login
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

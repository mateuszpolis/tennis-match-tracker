import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../forms/RegisterForm";

function RegisterPage() {
  useEffect(() => {
    document.title = `TTM - Register`;
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-8">      
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <div className="max-w-4xl w-full">
        <RegisterForm />
      </div>
      <Link to="/login" className="mt-4 underline">
        {" "}
        You already have an account? Log in!
      </Link>
    </div>
  );
}

export default RegisterPage;

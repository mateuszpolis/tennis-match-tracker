import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function ConfirmEmailPage() {
  const { token } = useParams<{ token: string }>();

  const { confirmEmail } = useAuth();
  const [confirmed, setConfirmed] = React.useState(false);

  const confirmEmailHandler = async () => {
    try {
      await confirmEmail(token!);
      toast.success("Adres email został potwierdzony!");
      setConfirmed(true);
    } catch (error: Error | any) {
      console.error("Email confirmation failed", error);
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      confirmEmailHandler();
    } else {
      navigate("/");
      toast.error("Nieprawidłowy adres");
    }
  }, [token]);

  return (
    <div className="w-full flex flex-col items-center">
      {confirmed ? (
        <div className="mt-6">
          <h2 className="text-3xl font-bold mb-4">
            Adres email został potwierdzony. Możesz się teraz zalogować
          </h2>
          <Link to="/login" className="underline">
            Wróć do logowania
          </Link>
        </div>
      ) : (
        <p className="text-red-500">Potwierdzanie adresu email...</p>
      )}
    </div>
  );
}

export default ConfirmEmailPage;

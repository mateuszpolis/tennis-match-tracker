import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: ReactElement;
  checkRole?: string | string[];
}

function PrivateRoute({ children, checkRole }: PrivateRouteProps) {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (checkRole && user && !checkRole.includes(user.role)) {
      navigate("/");
    }
  }, []);

  if (!user || (checkRole && user && !checkRole.includes(user.role))) {
    return null;
  }

  return children;
}

export default PrivateRoute;

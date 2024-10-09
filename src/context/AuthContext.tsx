import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../models/User";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  confirmEmail: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState<User | null>(null);
  // TODO: sprawdzic czy jest token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/details`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // if (isAuthenticated) {
    fetchUser();
    // }
  }, []);

  const confirmEmail = async (token: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas potwierdzania emaila");
      }
    } catch (error: any) {
      if (error.message !== "Błąd podczas potwierdzania emaila") {
        throw new Error("Błąd serwera");
      } else {
        throw error;
      }
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania maila");
      }
    } catch (error: any) {
      if (error.message !== "Błąd podczas wysyłania maila") {
        throw new Error("Błąd serwera");
      } else {
        throw error;
      }
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password, token }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas resetowania hasła");
      }
    } catch (error: any) {
      if (error.message !== "Błąd podczas resetowania hasła") {
        throw new Error("Błąd serwera");
      } else {
        throw error;
      }
    }
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas rejestracji");
      }
    } catch (error: any) {
      if (error.message !== "Błąd podczas rejestracji") {
        throw new Error("Błąd serwera");
      } else {
        throw error;
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        resetPassword,
        confirmEmail,
        forgotPassword,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

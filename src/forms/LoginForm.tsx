import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie-consent";

function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { login, user } = useAuth();

  const navigate = useNavigate();

  const cookieConsent = Cookies.get("zgoda_na_cookies");

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logowanie...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
    });

    try {
      await login(data.email, data.password);
      toast.update(toastId, {
        render: "Zalogowano pomyślnie!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/");
    } catch (error: Error | any) {
      console.error("Login failed", error);
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 items-stretch w-full"
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email jest wymagany",
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: "Niepoprawny adres email",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? String(errors.email.message) : ""}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "Hasło jest wymagane",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Hasło"
            error={!!errors.password}
            helperText={errors.password ? String(errors.password.message) : ""}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={cookieConsent !== "true"}
      >
        Zaloguj się
      </Button>
    </form>
  );
}

export default LoginForm;

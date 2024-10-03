import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Rejestracja w toku...", {
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
      await register(data.name, data.surname, data.email, data.password);
      toast.update(toastId, {
        render: "Zarejestrowano pomyślnie!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/login");
    } catch (error: Error | any) {
      console.error("Registration failed", error);
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const password = watch("password", "");

  const environment = process.env.NODE_ENV;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 items-stretch w-full"
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: "Imię jest wymagane",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Imię"
            error={!!errors.name}
            helperText={errors.name ? String(errors.name.message) : ""}
          />
        )}
      />

      <Controller
        name="surname"
        control={control}
        defaultValue=""
        rules={{
          required: "Nazwisko jest wymagane",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nazwisko"
            error={!!errors.surname}
            helperText={errors.surname ? String(errors.surname.message) : ""}
          />
        )}
      />

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
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:
              "Hasło musi zawierać co najmniej 8 znaków, jedną cyfrę i jeden znak specjalny",
          },
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

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Powtórzenie hasła jest wymagane",
          validate: (value) => value === password || "Hasła muszą się zgadzać",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Powtórz hasło"
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword
                ? String(errors.confirmPassword.message)
                : ""
            }
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={environment === "production" ? true : false}
      >
        Zarejestruj się
      </Button>
    </form>
  );
}

export default RegisterForm;

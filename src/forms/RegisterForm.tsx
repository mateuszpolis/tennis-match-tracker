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
    const toastId = toast.loading("Registering...", {
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
        render: "Registration successful!",
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
          required: "Name is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
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
          required: "Surname is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Surname"
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
          required: "Email is required",
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: "Invalid email address",
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
          required: "Password is required",
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message:
              "Password must contain at least 8 characters, including UPPER/lowercase and numbers",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Password"
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
          required: "Password confirmation is required",
          validate: (value) => value === password || "Passwords do not match",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Confirm Password"
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
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;

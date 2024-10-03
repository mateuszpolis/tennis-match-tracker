import { Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

type Props = {
  setSubmitted: (submitted: boolean) => void;
  token: string;
};

function ResetPasswordForm(props: Props) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const { resetPassword } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await resetPassword(data.password, props.token);
      props.setSubmitted(true);
      toast.success("Hasło zostało zresetowane!");
    } catch (error: Error | any) {
      console.error("Reset password failed", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 items-stretch w-full"
    >
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
            label="Nowe Hasło"
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

      <Button type="submit" variant="contained" color="primary">
        Ustaw nowe hasło
      </Button>
    </form>
  );
}

export default ResetPasswordForm;

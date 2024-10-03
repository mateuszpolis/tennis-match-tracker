import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

type ForgotPasswordFormProps = {
  setSubmitted: (submitted: boolean) => void;
};

function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { forgotPassword } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await forgotPassword(data.email);
      toast.success("Link do zresetowania hasła został wysłany!");
      props.setSubmitted(true);
    } catch (error: Error | any) {
      console.error("Forgot password failed", error);
      toast.error(error.message);
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
      <Button type="submit" variant="contained" color="primary">
        Zresetuj hasło
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;

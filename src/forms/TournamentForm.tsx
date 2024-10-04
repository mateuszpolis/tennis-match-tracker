import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TournamentCreationAttributes } from "../models/Tournament";
import { Surface } from "../models/TennisGround";

interface TournamentFormProps {
  tournament?: TournamentCreationAttributes; // Optional prop to pass tournament for editing
  onSubmit: (data: TournamentCreationAttributes) => any; // Function to handle form submission
}

const TournamentForm: React.FC<TournamentFormProps> = ({
  tournament,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TournamentCreationAttributes>({
    defaultValues: {
      name: tournament?.name || "",
      surface: tournament?.surface || Surface.CLAY,
      tennisGroundId: tournament?.tennisGroundId || 1,
    },
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: TournamentCreationAttributes) => {
    const toastId = toast.loading("Submitting...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    try {
      await onSubmit(data); // Call the onSubmit function passed via props
      toast.update(toastId, {
        render: "Tournament submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/tournaments"); // Redirect after successful submission
    } catch (error: any) {
      console.error("Tournament submission failed", error);
      toast.update(toastId, {
        render: error.message || "Error occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col space-y-2"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Tournament name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tournament Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="surface"
            control={control}
            rules={{ required: "Surface type is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Surface"
                fullWidth
                error={!!errors.surface}
                helperText={
                  errors.surface ? String(errors.surface.message) : ""
                }
              >
                <MenuItem value={Surface.CLAY}>Clay</MenuItem>
                <MenuItem value={Surface.GRASS}>Grass</MenuItem>
                <MenuItem value={Surface.HARD}>Hard</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="tennisGroundId"
            control={control}
            rules={{ required: "Ground ID is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tennis Ground ID"
                type="number"
                fullWidth
                error={!!errors.tennisGroundId}
                helperText={
                  errors.tennisGroundId
                    ? String(errors.tennisGroundId.message)
                    : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tournament ? "Update Tournament" : "Create Tournament"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TournamentForm;

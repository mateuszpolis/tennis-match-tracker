import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TournamentCreationAttributes } from "../models/Tournament";
import GroundSelect from "../components/forms/GroundSelect";

interface TournamentFormProps {
  tournament?: TournamentCreationAttributes;
  onSubmit: (data: TournamentCreationAttributes) => any;
}

function TournamentForm({ tournament, onSubmit }: TournamentFormProps) {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TournamentCreationAttributes>({
    defaultValues: {
      name: tournament?.name || "",
      tennisGroundId: tournament?.tennisGroundId || undefined,
      points: tournament?.points || 0,
    },
  });

  React.useEffect(() => {
    if (tournament) {
      reset({
        name: tournament.name,
        tennisGroundId: tournament.tennisGroundId,
        points: tournament.points,
      });
    }
  }, [tournament, reset]);

  const navigate = useNavigate();

  const handleFormSubmit = async (data: TournamentCreationAttributes) => {
    const toastId = toast.loading("Submitting...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    try {
      await onSubmit(data);
      toast.update(toastId, {
        render: "Tournament submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/tournaments");
    } catch (e: any) {
      toast.update(toastId, {
        render: e.response.data.message || "Error occurred",
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
            name="points"
            control={control}
            rules={{ required: "Points are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Points"
                fullWidth
                type="number"
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <GroundSelect
            control={control}
            errors={errors}
            defaultValue={tournament?.tennisGroundId}
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
}

export default TournamentForm;

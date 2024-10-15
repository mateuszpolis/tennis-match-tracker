import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Surface,
  TennisGroundCreationAttributes,
} from "../models/TennisGround";

interface TennisGroundFormProps {
  tennisGround?: TennisGroundCreationAttributes;
  onSubmit: (data: TennisGroundCreationAttributes) => Promise<void>;
}

const TennisGroundForm: React.FC<TennisGroundFormProps> = ({
  tennisGround,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TennisGroundCreationAttributes>({
    defaultValues: {
      name: "",
      description: "",
      constructionDate: new Date(),
      country: "",
      city: "",
      surface: Surface.CLAY,
    },
  });

  useEffect(() => {
    if (tennisGround) {
      reset({
        name: tennisGround.name || "",
        description: tennisGround.description || "",
        constructionDate: tennisGround.constructionDate
          ? new Date(tennisGround.constructionDate)
          : new Date(),
        country: tennisGround.country || "",
        city: tennisGround.city || "",
        surface: tennisGround.surface || Surface.CLAY,
      });
    }
  }, [tennisGround, reset]);

  const navigate = useNavigate();

  const handleFormSubmit = async (data: TennisGroundCreationAttributes) => {
    const toastId = toast.loading("Submitting...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    try {
      await onSubmit(data);
      toast.update(toastId, {
        render: "Tennis ground submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/tennis-grounds");
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
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={3}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="constructionDate"
            control={control}
            rules={{ required: "Construction date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Construction Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                error={!!errors.constructionDate}
                helperText={
                  errors.constructionDate
                    ? String(errors.constructionDate.message)
                    : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="surface"
            control={control}
            rules={{ required: "Surface is required" }}
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

        <Grid item xs={6}>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                error={!!errors.country}
                helperText={
                  errors.country ? String(errors.country.message) : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.city}
                helperText={errors.city ? String(errors.city.message) : ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tennisGround ? "Update Tennis Ground" : "Create Tennis Ground"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TennisGroundForm;

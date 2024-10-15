import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TournamentEditionCreationAttributes } from "../models/TournamentEdition";
import { format } from "date-fns";

interface TournamentEditionFormProps {
  edition?: TournamentEditionCreationAttributes;
  tournamentId: number;
  onSubmit: (data: TournamentEditionCreationAttributes) => any;
}

function TournamentEditionForm({
  edition,
  tournamentId,
  onSubmit,
}: TournamentEditionFormProps) {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TournamentEditionCreationAttributes>({
    defaultValues: {
      tournamentId: tournamentId,
      editionName: edition?.editionName || "",
      startDate: new Date(edition?.startDate!) || new Date(),
      endDate: new Date(edition?.endDate!) || new Date(),
      maximumNumberOfContestants: edition?.maximumNumberOfContestants || 0,
    },
  });

  React.useEffect(() => {
    if (edition) {
      reset({
        tournamentId: tournamentId,
        editionName: edition.editionName,
        startDate: new Date(format(edition.startDate, "yyyy-MM-dd")),
        endDate: new Date(format(edition.endDate, "yyyy-MM-dd")),
        maximumNumberOfContestants: edition.maximumNumberOfContestants,
      });
    }
  }, [edition, reset, tournamentId]);

  const navigate = useNavigate();

  const handleFormSubmit = async (
    data: TournamentEditionCreationAttributes
  ) => {
    const toastId = toast.loading("Submitting...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    try {
      await onSubmit(data);
      toast.update(toastId, {
        render: "Tournament edition submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/tournaments/${tournamentId}`);
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
      className="flex flex-col space-y-2 w-full"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="editionName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Edition Name (optional)"
                fullWidth
                error={!!errors.editionName}
                helperText={
                  errors.editionName ? String(errors.editionName.message) : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                error={!!errors.startDate}
                helperText={
                  errors.startDate ? String(errors.startDate.message) : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "End date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                error={!!errors.endDate}
                helperText={
                  errors.endDate ? String(errors.endDate.message) : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="maximumNumberOfContestants"
            control={control}
            rules={{
              required: "Maximum number of contestants is required",
              validate: {
                isNonZero: (value) =>
                  value > 0 || "The number of contestants cannot be 0",
                isPowerOfTwo: (value) =>
                  (value & (value - 1)) === 0 ||
                  "The number of contestants must be a power of 2",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Maximum Number of Contestants"
                type="number"
                fullWidth
                error={!!errors.maximumNumberOfContestants}
                helperText={
                  errors.maximumNumberOfContestants
                    ? String(errors.maximumNumberOfContestants.message)
                    : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {edition
              ? "Update Tournament Edition"
              : "Create Tournament Edition"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default TournamentEditionForm;

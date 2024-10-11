import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { Match, MatchCreationAttributes } from "../models/Match";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PlayerStatsForm from "./PlayerStatsForm";
import PlayerSelect from "../components/forms/PlayerSelect";
import GroundSelect from "../components/forms/GroundSelect";

interface MatchFormProps {
  match?: Match | null;
  onSubmit: (data: MatchCreationAttributes) => any;
  tournamentGenerated?: boolean;
}

function MatchForm({
  match,
  onSubmit,
  tournamentGenerated = false,
}: MatchFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MatchCreationAttributes>({
    defaultValues: {
      firstPlayerId: match?.firstPlayerId || undefined,
      secondPlayerId: match?.secondPlayerId || undefined,
      date: match?.date || new Date(),
      firstPlayerScore: match?.firstPlayerScore || 0,
      secondPlayerScore: match?.secondPlayerScore || 0,
      groundId: match?.groundId || undefined,
      finished: match?.finished || false,
      round: match?.round || undefined,
      firstPlayerStats: match?.firstPlayerStats || undefined,
      secondPlayerStats: match?.secondPlayerStats || undefined,
    },
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: MatchCreationAttributes) => {
    const toastId = toast.loading("Submitting...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    try {
      await onSubmit(data);
      toast.update(toastId, {
        render: "Match submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      if (tournamentGenerated) {
        navigate(
          `/tournaments/${match?.tournamentEdition?.tournamentId}/edition/${match?.tournamentEdition?.year}`
        );
      } else {
        navigate("/");
      }
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        {!tournamentGenerated && (
          <Grid item xs={6}>
            <PlayerSelect
              control={control}
              errors={errors}
              label="First Player"
              name="firstPlayerId"
              defaultValue={match?.firstPlayerId}
            />
          </Grid>
        )}
        {!tournamentGenerated && (
          <Grid item xs={6}>
            <PlayerSelect
              control={control}
              errors={errors}
              label="Second Player"
              name="secondPlayerId"
              defaultValue={match?.secondPlayerId}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Match Date"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="firstPlayerScore"
            control={control}
            rules={{
              required: "First player score is required",
              min: { value: 0, message: "Minimum score is 0" },
              max: { value: 3, message: "Maximum score is 3" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Player Score"
                fullWidth
                type="number"
                error={!!errors.firstPlayerScore}
                helperText={
                  errors.firstPlayerScore
                    ? String(errors.firstPlayerScore.message)
                    : ""
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="secondPlayerScore"
            control={control}
            rules={{
              required: "Second player score is required",
              min: { value: 0, message: "Minimum score is 0" },
              max: { value: 3, message: "Maximum score is 3" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Second Player Score"
                fullWidth
                type="number"
                error={!!errors.secondPlayerScore}
                helperText={
                  errors.secondPlayerScore
                    ? String(errors.secondPlayerScore.message)
                    : ""
                }
              />
            )}
          />
        </Grid>

        {!tournamentGenerated && (
          <Grid item xs={12}>
            <GroundSelect
              control={control}
              errors={errors}
              defaultValue={match?.groundId}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <h2 className="uppercase text-primary font-bold text-2xl">
            Match Stats
          </h2>
        </Grid>

        <Grid item xs={12}>
          <PlayerStatsForm control={control} errors={errors} />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {match ? "Update Match" : "Create Match"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default MatchForm;

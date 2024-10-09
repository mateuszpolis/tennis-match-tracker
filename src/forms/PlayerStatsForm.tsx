import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Grid } from "@mui/material";

interface PlayerStatsFormProps {
  control: any;
  errors: any;
}

const PlayerStatsForm: React.FC<PlayerStatsFormProps> = ({
  control,
  errors,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name="firstPlayerStats.aces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Player Aces"
              fullWidth
              type="number"
              error={!!errors.firstPlayerStats?.aces}
              helperText={
                errors.firstPlayerStats?.aces
                  ? String(errors.firstPlayerStats.aces.message)
                  : ""
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="secondPlayerStats.aces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Second Player Aces"
              fullWidth
              type="number"
              error={!!errors.secondPlayerStats?.aces}
              helperText={
                errors.secondPlayerStats?.aces
                  ? String(errors.secondPlayerStats.aces.message)
                  : ""
              }
            />
          )}
        />
      </Grid>

      {[
        { name: "doubleFaults", label: "Double Faults" },
        { name: "firstServePercentage", label: "First Serve Percentage" },
        { name: "pointsWonOnFirstServe", label: "Points Won on First Serve" },
        { name: "pointsWonOnSecondServe", label: "Points Won on Second Serve" },
        { name: "breakPointsSaved", label: "Break Points Saved" },
        {
          name: "returnPointsWonOnFirstServe",
          label: "Return Points Won on First Serve",
        },
        {
          name: "returnPointsWonOnSecondServe",
          label: "Return Points Won on Second Serve",
        },
        { name: "breakPointsConverted", label: "Break Points Converted" },
        { name: "winners", label: "Winners" },
        { name: "unforcedErrors", label: "Unforced Errors" },
        { name: "netPointsWon", label: "Net Points Won" },
        { name: "consecutivePointsWon", label: "Consecutive Points Won" },
        { name: "servicePointsWon", label: "Service Points Won" },
        { name: "returnPointsWon", label: "Return Points Won" },
      ].map((stat, idx) => (
        <React.Fragment key={stat.name}>
          <Grid item xs={6}>
            <Controller
              name={`firstPlayerStats.${stat.name}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`First Player ${stat.label}`}
                  fullWidth
                  type="number"
                  error={!!errors.firstPlayerStats?.[stat.name]}
                  helperText={
                    errors.firstPlayerStats?.[stat.name]
                      ? String(errors.firstPlayerStats[stat.name]?.message)
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name={`secondPlayerStats.${stat.name}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Second Player ${stat.label}`}
                  fullWidth
                  type="number"
                  error={!!errors.secondPlayerStats?.[stat.name]}
                  helperText={
                    errors.secondPlayerStats?.[stat.name]
                      ? String(errors.secondPlayerStats[stat.name]?.message)
                      : ""
                  }
                />
              )}
            />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default PlayerStatsForm;

import { PlusOne } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function TournamentList({}: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        size="small"
        color="success"
        variant="outlined"
        onClick={() => {
          navigate("add");
        }}
        endIcon={<PlusOne />}
      >
        Add new Tournament
      </Button>
    </div>
  );
}

export default TournamentList;

import { PlusOne } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTennisGround } from "../../context/TennisGroundContext";
import { TennisGround } from "../../models/TennisGround";
import { toast } from "react-toastify";
import GroundCard from "../../components/global/GroundCard";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../models/User";

function GroundsList() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const { fetchGrounds } = useTennisGround();
  const [grounds, setGrounds] = useState<TennisGround[]>([]);

  const getTennisGrounds = async () => {
    try {
      setGrounds(await fetchGrounds());
    } catch (e: any) {
      toast.error(e.response.data.message || "Failed to fetch tennis grounds.");
    }
  };

  useEffect(() => {
    getTennisGrounds();
  }, []);

  return (
    <div className="p-8">
      {isAuthenticated && user?.role === UserRole.Admin && (
        <Button
          size="small"
          color="success"
          variant="outlined"
          onClick={() => {
            navigate("add");
          }}
          endIcon={<PlusOne />}
        >
          Add new Tennis Ground
        </Button>
      )}
      <h1 className="text-2xl font-bold uppercase text-primary">
        List of Tennis Grounds:
      </h1>
      <div className="p-3 space-y-2">
        {grounds.map((ground) => (
          <GroundCard ground={ground} key={ground.id} />
        ))}
      </div>
    </div>
  );
}

export default GroundsList;

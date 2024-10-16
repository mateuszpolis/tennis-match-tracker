import React, { useEffect, useState } from "react";
import {
  TennisGround,
  TennisGroundCreationAttributes,
} from "../../../models/TennisGround";
import TennisGroundForm from "../../../forms/TennisGroundForm";
import { useTennisGround } from "../../../context/TennisGroundContext";
import { useParams } from "react-router-dom";

function AddGroundPage() {
  const { id } = useParams();

  const { createGround, getGround, editGround } = useTennisGround();
  const [ground, setGround] = useState<TennisGround | null>(null);

  useEffect(() => {
    const fetchGround = async () => {
      try {
        setGround(await getGround(Number(id!)));
      } catch (e: any) {
        console.error(e);
      }
    };

    if (id) {
      fetchGround();
    }
  }, [getGround, id]);

  const submitForm = async (
    data: TennisGroundCreationAttributes
  ): Promise<any> => {
    try {
      if (id) {
        await editGround(Number(id), data);
      } else {
        await createGround(data);
      }      
    } catch (e: any) {
      throw e;
    }
  };

  return (
    <div className="p-2 md:p-8">
      <TennisGroundForm
        onSubmit={submitForm}
        tennisGround={ground as TennisGroundCreationAttributes}
      />
    </div>
  );
}

export default AddGroundPage;

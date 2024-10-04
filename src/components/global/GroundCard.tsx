import React from "react";
import { TennisGround } from "../../models/TennisGround";
import { Link } from "react-router-dom";
import { CalendarToday } from "@mui/icons-material";

type Props = {
  ground: TennisGround;
};

function GroundCard({ ground }: Props) {
  console.log(ground);

  return (
    <Link
      to={`/tennis-grounds/${ground.id}`}
      key={ground.id}
      className="bg-white p-5 transition-all shadow-md flex flex-col justify-between hover:shadow-custom"
    >
      <div>
        <h2 className="text-xl font-bold mb-2">{ground.name}</h2>
        <p className="text-sm text-gray-500">
          {ground.city}, {ground.country}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-gray-600">
          <CalendarToday />
          <p>
            Construction date:{" "}
            {new Date(ground.constructionDate).toLocaleDateString("pl")}
          </p>
        </div>
        <div
          className={`text-xs text-background font-semibold py-1 px-2 rounded ${
            ground.surface === "CLAY"
              ? "bg-orange-700"
              : ground.surface === "GRASS"
              ? "bg-green-700"
              : "bg-blue-700"
          }`}
        >
          {ground.surface}
        </div>
      </div>
    </Link>
  );
}

export default GroundCard;

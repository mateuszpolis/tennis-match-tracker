import React from "react";
import { Tournament } from "../../models/Tournament";
import { Link } from "react-router-dom";
import { CalendarToday, SportsTennis } from "@mui/icons-material";
import TournamentCard from "../../components/global/TournamentCard";

const tournaments = [
  {
    id: 1,
    name: "Roland Garros",
    surface: "CLAY",
    startDate: new Date(2024, 4, 26),
    endDate: new Date(2024, 5, 9),
    ground: {
      id: 1,
      name: "Stade Roland Garros",
      description:
        "The venue for the French Open, known for its iconic clay courts.",
      constructionDate: new Date(1928, 4, 1),
      country: "France",
      city: "Paris",
    },
  },
  {
    id: 2,
    name: "Wimbledon",
    surface: "GRASS",
    startDate: new Date(2024, 6, 1),
    endDate: new Date(2024, 6, 14),
    ground: {
      id: 2,
      name: "All England Lawn Tennis and Croquet Club",
      description:
        "The prestigious venue for Wimbledon, the oldest tennis tournament in the world.",
      constructionDate: new Date(1877, 6, 9),
      country: "United Kingdom",
      city: "London",
    },
  },
  {
    id: 3,
    name: "US Open",
    surface: "HARD",
    startDate: new Date(2024, 7, 26),
    endDate: new Date(2024, 8, 8),
    ground: {
      id: 3,
      name: "USTA Billie Jean King National Tennis Center",
      description:
        "The venue for the US Open, featuring hard courts and Arthur Ashe Stadium.",
      constructionDate: new Date(1978, 8, 1),
      country: "United States",
      city: "New York",
    },
  },
  {
    id: 4,
    name: "Australian Open",
    surface: "HARD",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 0, 28),
    ground: {
      id: 4,
      name: "Melbourne Park",
      description:
        "Home to the Australian Open, featuring the iconic Rod Laver Arena.",
      constructionDate: new Date(1988, 0, 11),
      country: "Australia",
      city: "Melbourne",
    },
  },
  {
    id: 5,
    name: "Monte Carlo Masters",
    surface: "CLAY",
    startDate: new Date(2024, 9, 2),
    endDate: new Date(2024, 9, 14),
    ground: {
      id: 5,
      name: "Monte Carlo Country Club",
      description: "A prestigious clay-court tournament in the Mediterranean.",
      constructionDate: new Date(1928, 3, 20),
      country: "Monaco",
      city: "Monte Carlo",
    },
  },
] as Tournament[];

function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold uppercase text-primary mb-6">
        Upcoming Tournaments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <TournamentCard tournament={tournament} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

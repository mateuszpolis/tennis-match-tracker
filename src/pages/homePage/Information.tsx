import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Information() {
  return (
    <div>
      <h1 className="text-5xl font-bold uppercase mb-6 font-display text-primary text-center drop-shadow-2xl px-2 py-6 bg-background bg-opacity-90">
        Welcome to Tennis Tournament Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 p-2 md:p-8">
        <div className="bg-white p-4 bg-opacity-90 backdrop-blur-lg flex flex-col items-center shadow-lg space-y-4">
          <AccountCircleIcon
            className="text-primary"
            style={{ fontSize: 50 }}
          />
          <h3 className="text-xl font-bold text-primary">Create an Account</h3>
          <p className="text-gray-600 text-center">
            Sign up and create your personal profile to join our tennis
            community and get started!
          </p>
        </div>

        <div className="bg-white p-4 bg-opacity-90 backdrop-blur-lg flex flex-col items-center shadow-lg space-y-4">
          <EventIcon className="text-primary" style={{ fontSize: 50 }} />
          <h3 className="text-xl font-bold text-primary">
            Sign up for Tournaments
          </h3>
          <p className="text-gray-600 text-center">
            Browse upcoming tournaments and register to compete with other
            tennis players.
          </p>
        </div>

        <div className="bg-white p-4 bg-opacity-90 backdrop-blur-lg flex flex-col items-center shadow-lg space-y-4">
          <ShowChartIcon className="text-primary" style={{ fontSize: 50 }} />
          <h3 className="text-xl font-bold text-primary">Track Your Skills</h3>
          <p className="text-gray-600 text-center">
            Access your personal panel to monitor your performance and track
            your progress over time.
          </p>
        </div>

        <div className="bg-white p-4 bg-opacity-90 backdrop-blur-lg flex flex-col items-center shadow-lg space-y-4">
          <EmojiEventsIcon className="text-primary" style={{ fontSize: 50 }} />
          <h3 className="text-xl font-bold text-primary">Compete for No. 1</h3>
          <p className="text-gray-600 text-center">
            Play your best to climb the rankings and become the top player in
            our tennis community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Information;

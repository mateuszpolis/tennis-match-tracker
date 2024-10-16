import { SearchOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useDebounce from "../../../../hooks/useDebounce";
import { Tournament } from "../../../../models/Tournament";
import { TournamentEdition } from "../../../../models/TournamentEdition";
import { useTournament } from "../../../../context/TournamentContext";
import { Match } from "../../../../models/Match";
import { useMatch } from "../../../../context/MatchContext";
import { User } from "../../../../models/User";
import { useUser } from "../../../../context/UserContext";
import { TennisGround } from "../../../../models/TennisGround";
import { useTennisGround } from "../../../../context/TennisGroundContext";

function SearchBar() {
  const { control } = useForm();
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const debouncedQuery = useDebounce(search, 500);

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentEditions, setTournamentEditions] = useState<
    TournamentEdition[]
  >([]);
  const { queryTournaments } = useTournament();

  const [matches, setMatches] = useState<Match[]>([]);
  const { queryMatches } = useMatch();

  const [players, setPlayers] = useState<User[]>([]);
  const { getUsersByQuery } = useUser();

  const [grounds, setGrounds] = useState<TennisGround[]>([]);
  const { queryGrounds } = useTennisGround();

  useEffect(() => {
    const fetchTournaments = async () => {
      const data = await queryTournaments(search);
      setTournaments(data.tournaments);
      setTournamentEditions(data.tournamentEditions);
    };

    const fetchMatches = async () => {
      try {
        const data = await queryMatches(search);
        setMatches(data);
      } catch (e: any) {
        console.error(e);
      }
    };

    const fetchPlayers = async () => {
      try {
        setPlayers(await getUsersByQuery(search, 5));
      } catch (e: any) {
        console.error(e);
      }
    };

    const fetchGrounds = async () => {
      try {
        setGrounds(await queryGrounds(search));
      } catch (e: any) {
        console.error(e);
      }
    };

    if (debouncedQuery !== "") {
      fetchTournaments();
      fetchMatches();
      fetchPlayers();
      fetchGrounds();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className="flex flex-col items-center space-y-1 w-full"
    >
      <div className="flex items-center justify-center space-x-1 relative w-full">
        <form
          name="search"
          id="search"
          className="flex items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                value={search}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for anything... (e.g. 'wimbledon' or 'rafael nadal')"
                className="border rounded-sm p-2 w-full h-full hover:drop-shadow-xl hover:border-primary focus:outline-none focus-within:border-primary focus-within:drop-shadow-xl"
              />
            )}
          />
        </form>

        {isFocused &&
          (tournamentEditions.length !== 0 ||
            tournaments.length !== 0 ||
            matches.length !== 0 ||
            players.length !== 0 ||
            grounds.length !== 0) && (
            <div className="border border-gray-300 rounded-sm w-full mt-2 p-2 bg-white bg-opacity-80 backdrop-blur-md drop-shadow-lg absolute top-full z-10 max-h-[80vh] overflow-y-scroll">
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Tournaments:</p>
              </div>
              <ul>
                {tournaments.length === 0 && (
                  <p className="pl-4 p-2 text-sm text-gray-500">
                    No tournaments found
                  </p>
                )}
                {tournaments.map((tournament, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/tournaments/${tournament.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full flex items-center space-x-2"
                    >
                      <SearchOutlined />
                      <div>
                        <span className="ml-2">{tournament.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">
                  Tournament editions:
                </p>
              </div>
              <ul>
                {tournamentEditions.length === 0 && (
                  <p className="pl-4 p-2 text-sm text-gray-500">
                    No tournament editions found
                  </p>
                )}
                {tournamentEditions.map((tournamentEdition, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/tournaments/${tournamentEdition.tournamentId}/edition/${tournamentEdition.year}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full flex items-center space-x-2"
                    >
                      <SearchOutlined />
                      <div>
                        <span className="ml-2">
                          {tournamentEdition.editionName}{" "}
                          {tournamentEdition.tournament?.name}{" "}
                          {tournamentEdition.year}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Players:</p>
              </div>
              <ul>
                {players.length === 0 && (
                  <p className="pl-4 p-2 text-sm text-gray-500">
                    No players found
                  </p>
                )}
                {players.map((player, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/player/${player.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full flex items-center space-x-2"
                    >
                      <SearchOutlined />
                      <div className="text-sm flex items-center space-x-1 divide-x divide-primary">
                        <span className="ml-2 p-1">
                          {player.name + " " + player.surname}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Matches:</p>
              </div>
              <ul>
                {matches.length === 0 && (
                  <p className="pl-4 p-2 text-sm text-gray-500">
                    No matches found
                  </p>
                )}
                {matches.map((match, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/match/${match.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full flex items-center space-x-2"
                    >
                      <SearchOutlined />
                      <div className="text-sm flex flex-col space-y-1 divide-y md:flex-row items-center md:space-x-1 md:divide-x divide-primary">
                        <span className="ml-2 p-1">
                          {match.firstPlayer.name +
                            " " +
                            match.firstPlayer.surname}{" "}
                          vs{" "}
                          {match.secondPlayer.name +
                            " " +
                            match.secondPlayer.surname}
                        </span>
                        {match.firstPlayerScore === 0 &&
                        match.secondPlayerScore === 0 ? (
                          <span className="p-1">Not played yet</span>
                        ) : (
                          <span className="p-1">
                            {match.firstPlayerScore} - {match.secondPlayerScore}
                          </span>
                        )}
                        <span className="p-1">
                          {new Date(match.date).toLocaleDateString("pl-PL")}
                        </span>
                        {match.tournamentEdition?.tournament?.name && (
                          <span className="p-1">
                            {match.tournamentEdition?.tournament?.name}{" "}
                            {match.tournamentEdition?.year}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Tennis Grounds:</p>
              </div>
              <ul>
                {grounds.length === 0 && (
                  <p className="pl-4 p-2 text-sm text-gray-500">
                    No tennis grounds found
                  </p>
                )}
                {grounds.map((ground, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/tennis-grounds/${ground.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full flex items-center space-x-2"
                    >
                      <SearchOutlined />
                      <div>
                        <span className="ml-2">{ground.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchBar;

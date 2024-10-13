import { Search, SearchOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../../../hooks/useDebounce";
import { Tournament } from "../../../../models/Tournament";
import { TournamentEdition } from "../../../../models/TournamentEdition";
import { useTournament } from "../../../../context/TournamentContext";
import { Match } from "../../../../models/Match";
import { useMatch } from "../../../../context/MatchContext";

function SearchBar() {
  const width = window.innerWidth;

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchTournaments = async () => {
      const data = await queryTournaments(search);
      setTournaments(data.tournaments);
      setTournamentEditions(data.tournamentEditions);
    };

    const fetchMatches = async () => {
      const data = await queryMatches(search);
      setMatches(data);
    };

    if (debouncedQuery !== "") {
      fetchTournaments();
      fetchMatches();
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
            navigate(`/szukaj?search=${search}`);
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
          <IconButton color="primary" type="submit" form="search">
            <SearchOutlined sx={{ fontSize: width <= 768 ? 25 : 40 }} />
          </IconButton>
        </form>

        {isFocused &&
          (tournamentEditions.length !== 0 ||
            tournaments.length !== 0 ||
            matches.length !== 0) && (
            <div className="border border-gray-300 rounded-sm w-full mt-2 p-2 bg-white drop-shadow-lg absolute top-full z-10">
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Tournaments:</p>
                <Link
                  to={`/search?search=${search}&type=tournament`}
                  onClick={() => setIsFocused(false)}
                  className="p-2 text-sm text-primary font-semibold flex items-center space-x-1 hover:bg-primary hover:text-white rounded-md transition-all"
                >
                  <span>Search for Tournaments</span>
                  <Search />
                </Link>
              </div>
              <ul>
                {tournaments.map((tournament, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/tournaments/${tournament.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full"
                    >
                      <SearchOutlined />
                      <span className="ml-2">{tournament.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">
                  Tournament editions:
                </p>
                <Link
                  to={`/search?search=${search}&type=tournament-edition`}
                  onClick={() => setIsFocused(false)}
                  className="p-2 text-sm text-primary font-semibold flex items-center space-x-1 hover:bg-primary hover:text-white rounded-md transition-all"
                >
                  <span>Search for Tournament Editions</span>
                  <Search />
                </Link>
              </div>
              <ul>
                {tournamentEditions.map((tournamentEdition, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/tournaments/${tournamentEdition.tournamentId}/edition/${tournamentEdition.year}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full"
                    >
                      <SearchOutlined />
                      <span className="ml-2">
                        {tournamentEdition.editionName}{" "}
                        {tournamentEdition.tournament?.name}{" "}
                        {tournamentEdition.year}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <p className="p-2 text-sm text-gray-500">Matches:</p>
                <Link
                  to={`/search?search=${search}&type=match`}
                  onClick={() => setIsFocused(false)}
                  className="p-2 text-sm text-primary font-semibold flex items-center space-x-1 hover:bg-primary hover:text-white rounded-md transition-all"
                >
                  <span>Search for Matches</span>
                  <Search />
                </Link>
              </div>
              <ul>
                {matches.map((match, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <Link
                      to={`/match/${match.id}`}
                      onClick={() => setIsFocused(false)}
                      className="w-full h-full"
                    >
                      <SearchOutlined />
                      <div>
                        <span className="ml-2">
                          {match.firstPlayer.name +
                            " " +
                            match.firstPlayer.surname}{" "}
                          vs{" "}
                          {match.secondPlayer.name +
                            " " +
                            match.secondPlayer.surname}
                        </span>
                        <span>
                          {match.firstPlayerScore} - {match.secondPlayerScore}
                        </span>
                        <span>
                          {new Date(match.date).toLocaleDateString("pl-PL")}
                        </span>
                        <span>
                          {match.tournamentEdition?.tournament?.name}{" "}
                          {match.tournamentEdition?.year}
                        </span>
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

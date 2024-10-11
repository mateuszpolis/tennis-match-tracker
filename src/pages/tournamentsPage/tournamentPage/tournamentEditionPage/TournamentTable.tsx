import React from "react";
import { useTable, useSortBy, Column } from "react-table";
import { useNavigate } from "react-router-dom";
import { UserTournamentEdition } from "../../../../models/TournamentEdition";

type Props = {
  players: UserTournamentEdition[];
};

const TournamentTable = ({ players }: Props) => {
  const navigate = useNavigate();

  const data = React.useMemo(
    () =>
      players.map((player) => ({
        name: player.user?.name + " " + player.user?.surname,
        wins: player.numberOfWins,
        losses: player.numberOfLosses,
        points: player.pointsReceived,
        userId: player.userId,
      })),
    [players]
  );

  const columns = React.useMemo<
    Column<{
      name: string;
      wins: number;
      losses: number;
      points: number;
      userId: number;
    }>[]
  >(
    () => [
      {
        Header: "Name",
        accessor: "name" as const,
      },
      {
        Header: "Wins",
        accessor: "wins" as const,
      },
      {
        Header: "Losses",
        accessor: "losses" as const,
      },
      {
        Header: "Points",
        accessor: "points" as const,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-background">Players</h2>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.headers[0].id}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    (column as any).getSortByToggleProps()
                  )}
                  key={column.id}
                  className="border p-4 bg-primary bg-opacity-65 hover:bg-opacity-100 text-white font-bold font-display uppercase text-3xl"
                >
                  {column.render("Header")}
                  <span>
                    {(column as any).isSorted
                      ? (column as any).isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="bg-white bg-opacity-60 hover:bg-opacity-100 cursor-pointer"
                onClick={() => {
                  navigate(`/player/${row.original.userId}`);
                }}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="border p-4"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentTable;

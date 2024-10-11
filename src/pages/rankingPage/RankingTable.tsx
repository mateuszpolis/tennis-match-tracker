import React from "react";
import { useTable, Column } from "react-table";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";

type Props = {
  ranking: User[];
};

const RankingTable = ({ ranking }: Props) => {
  const data = React.useMemo(
    () =>
      ranking.map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        rankingPoints: user.rankingPoints,
      })),
    [ranking]
  );

  const columns = React.useMemo<
    Column<{
      id: number;
      name: string;
      surname: string;
      rankingPoints: number;
    }>[]
  >(
    () => [
      {
        Header: "Ranking Points",
        accessor: "rankingPoints" as const,
      },
      {
        Header: "Name",
        accessor: "name" as const,
      },
      {
        Header: "Surname",
        accessor: "surname" as const,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border-collapse">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.headers[0].id}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="border p-4 bg-primary bg-opacity-65 hover:bg-opacity-100 text-white font-bold font-display uppercase text-3xl"
              >
                {column.render("Header")}
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
              onClick={() => {
                navigate(`/player/${row.original.id}`);
              }}
              className="hover:bg-white hover:bg-opacity-60 cursor-pointer"
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
  );
};

export default RankingTable;

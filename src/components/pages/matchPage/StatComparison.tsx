interface StatComparisonProps {
  statName: string;
  player1Stat: number;
  player2Stat: number;
}

export const StatComparison: React.FC<StatComparisonProps> = ({
  statName,
  player1Stat,
  player2Stat,
}) => {
  const player1Better = player1Stat > player2Stat;
  const player2Better = player2Stat > player1Stat;

  const player1Width = (player1Stat / Math.max(player1Stat, player2Stat)) * 80;
  const player2Width = (player2Stat / Math.max(player1Stat, player2Stat)) * 80;

  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2">
      <div
        className="flex items-center justify-end space-x-1"
        style={{ width: "100%" }}
      >
        <div className="flex items-center" style={{ width: "120px" }}>
          <div
            className="flex items-center justify-end"
            style={{ width: "80px" }}
          >
            <div
              className={`h-2 bg-primary ${
                player1Better ? "opacity-100" : "opacity-50"
              }`}
              style={{
                width: player1Width,
              }}
            ></div>
          </div>
          <div
            className={`text-right ${
              player1Better ? "font-bold text-green-500" : ""
            }`}
            style={{ width: "40px", textAlign: "right" }}
          >
            {player1Stat}
          </div>
        </div>
      </div>

      <div className="text-center font-semibold">{statName}</div>

      <div
        className="flex items-center justify-start space-x-1"
        style={{ width: "100%" }}
      >
        <div
          className="grid grid-cols-2 items-center"
          style={{ maxWidth: "80px" }}
        >
          <div
            className={`text-left ${
              player2Better ? "font-bold text-green-500" : ""
            }`}
            style={{ minWidth: "40px", textAlign: "left" }}
          >
            {player2Stat}
          </div>
          <div
            className={`h-2 bg-primary ${
              player2Better ? "opacity-100" : "opacity-50"
            }`}
            style={{
              width: player2Width,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

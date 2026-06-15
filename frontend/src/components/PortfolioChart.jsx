import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PortfolioChart({ portfolio }) {

  const data = portfolio.map(item => ({
    name: item.symbol,
    value:
      item.buyPrice *
      item.quantity
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {data.map(
            (_, index) => (
              <Cell
                key={index}
              />
            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default PortfolioChart;
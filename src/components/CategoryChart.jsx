import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { findCategory } from '../utils/categories'
import { formatCurrency } from '../utils/format'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CategoryChart({ transactions }) {
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const entries = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])

  if (entries.length === 0) {
    return (
      <div className="chart-card">
        <h2>Despesas por categoria</h2>
        <div className="empty-state small">
          <p>Sem despesas para exibir ainda.</p>
        </div>
      </div>
    )
  }

  const labels = entries.map(([categoryId]) => findCategory('expense', categoryId).label)
  const colors = entries.map(([categoryId]) => findCategory('expense', categoryId).color)
  const values = entries.map(([, amount]) => amount)
  const total = values.reduce((sum, v) => sum + v, 0)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#cbd5e1', boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const percent = ((ctx.parsed / total) * 100).toFixed(1)
            return ` ${ctx.label}: ${formatCurrency(ctx.parsed)} (${percent}%)`
          },
        },
      },
    },
    cutout: '65%',
  }

  return (
    <div className="chart-card">
      <h2>Despesas por categoria</h2>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

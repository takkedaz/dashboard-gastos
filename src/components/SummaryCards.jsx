import { formatCurrency } from '../utils/format'

export default function SummaryCards({ income, expense }) {
  const balance = income - expense

  return (
    <div className="summary-cards">
      <div className="card balance">
        <span className="card-label">Saldo</span>
        <span className={`card-value ${balance < 0 ? 'negative' : ''}`}>
          {formatCurrency(balance)}
        </span>
      </div>
      <div className="card income">
        <span className="card-label">Receitas</span>
        <span className="card-value">{formatCurrency(income)}</span>
      </div>
      <div className="card expense">
        <span className="card-label">Despesas</span>
        <span className="card-value">{formatCurrency(expense)}</span>
      </div>
    </div>
  )
}

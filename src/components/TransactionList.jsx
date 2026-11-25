import { findCategory } from '../utils/categories'
import { formatCurrency, formatDate } from '../utils/format'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma transação encontrada.</p>
        <span>Adicione uma transação ou ajuste os filtros.</span>
      </div>
    )
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => {
        const category = findCategory(t.type, t.category)
        return (
          <li key={t.id} className="transaction-item">
            <span className="category-dot" style={{ backgroundColor: category.color }} />

            <div className="transaction-info">
              <strong>{t.description}</strong>
              <span className="transaction-meta">
                {category.label} · {formatDate(t.date)}
              </span>
            </div>

            <span className={`transaction-amount ${t.type}`}>
              {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
            </span>

            <div className="transaction-actions">
              <button onClick={() => onEdit(t)} aria-label="Editar transação">
                ✎
              </button>
              <button onClick={() => onDelete(t.id)} aria-label="Excluir transação">
                ✕
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

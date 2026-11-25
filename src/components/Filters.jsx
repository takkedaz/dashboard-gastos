export default function Filters({ filters, onChange, months }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <button
          className={filters.type === 'all' ? 'active' : ''}
          onClick={() => onChange({ ...filters, type: 'all' })}
        >
          Todas
        </button>
        <button
          className={filters.type === 'income' ? 'active' : ''}
          onClick={() => onChange({ ...filters, type: 'income' })}
        >
          Receitas
        </button>
        <button
          className={filters.type === 'expense' ? 'active' : ''}
          onClick={() => onChange({ ...filters, type: 'expense' })}
        >
          Despesas
        </button>
      </div>

      <div className="field">
        <select
          value={filters.month}
          onChange={(e) => onChange({ ...filters, month: e.target.value })}
        >
          <option value="all">Todos os meses</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field search-field">
        <input
          type="text"
          placeholder="Buscar transação..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
    </div>
  )
}

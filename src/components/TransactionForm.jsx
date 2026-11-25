import { useEffect, useState } from 'react'
import { CATEGORIES } from '../utils/categories'

const emptyForm = {
  description: '',
  amount: '',
  type: 'expense',
  category: CATEGORIES.expense[0].id,
  date: new Date().toISOString().slice(0, 10),
}

export default function TransactionForm({ onSubmit, editingTransaction, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTransaction) {
      setForm(editingTransaction)
    }
  }, [editingTransaction])

  function handleTypeChange(type) {
    setForm((prev) => ({ ...prev, type, category: CATEGORIES[type][0].id }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const amount = Number(form.amount)
    if (!form.description.trim()) {
      setError('Dá um nome pra essa transação.')
      return
    }
    if (!amount || amount <= 0) {
      setError('O valor precisa ser maior que zero.')
      return
    }

    onSubmit({ ...form, amount, description: form.description.trim() })
    setForm(emptyForm)
    setError('')
  }

  function handleCancel() {
    setForm(emptyForm)
    setError('')
    onCancelEdit()
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>{editingTransaction ? 'Editar transação' : 'Nova transação'}</h2>

      <div className="type-toggle">
        <button
          type="button"
          className={form.type === 'expense' ? 'active expense' : ''}
          onClick={() => handleTypeChange('expense')}
        >
          Despesa
        </button>
        <button
          type="button"
          className={form.type === 'income' ? 'active income' : ''}
          onClick={() => handleTypeChange('income')}
        >
          Receita
        </button>
      </div>

      <div className="field">
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          type="text"
          placeholder="Ex: Supermercado"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="amount">Valor (R$)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES[form.type].map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {editingTransaction ? 'Salvar alterações' : 'Adicionar'}
        </button>
        {editingTransaction && (
          <button type="button" className="ghost-button" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

import { useMemo, useState } from 'react'
import { useTransactions } from './hooks/useTransactions'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import Filters from './components/Filters'
import TransactionList from './components/TransactionList'
import CategoryChart from './components/CategoryChart'
import { monthLabel } from './utils/format'
import './App.css'

export default function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions()
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [filters, setFilters] = useState({ type: 'all', month: 'all', search: '' })

  const months = useMemo(() => {
    const unique = new Map()
    transactions.forEach((t) => {
      const value = t.date.slice(0, 7)
      if (!unique.has(value)) unique.set(value, monthLabel(t.date))
    })
    return [...unique.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([value, label]) => ({ value, label }))
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.type !== 'all' && t.type !== filters.type) return false
      if (filters.month !== 'all' && !t.date.startsWith(filters.month)) return false
      if (
        filters.search &&
        !t.description.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      return true
    })
  }, [transactions, filters])

  const { income, expense } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') acc.income += t.amount
        else acc.expense += t.amount
        return acc
      },
      { income: 0, expense: 0 }
    )
  }, [transactions])

  function handleSubmit(data) {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data)
      setEditingTransaction(null)
    } else {
      addTransaction(data)
    }
  }

  function handleDelete(id) {
    if (editingTransaction?.id === id) setEditingTransaction(null)
    deleteTransaction(id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Dashboard de Gastos</h1>
        <p>Controle suas receitas e despesas em um só lugar.</p>
      </header>

      <SummaryCards income={income} expense={expense} />

      <div className="app-grid">
        <aside className="sidebar">
          <TransactionForm
            onSubmit={handleSubmit}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />
          <CategoryChart transactions={transactions} />
        </aside>

        <main className="main-content">
          <Filters filters={filters} onChange={setFilters} months={months} />
          <TransactionList
            transactions={filteredTransactions}
            onEdit={setEditingTransaction}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  )
}

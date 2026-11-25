import { useEffect, useState } from 'react'

const STORAGE_KEY = 'dashboard-gastos:transactions'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction(data) {
    const transaction = { id: crypto.randomUUID(), ...data }
    setTransactions((prev) => [transaction, ...prev])
  }

  function updateTransaction(id, data) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    )
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  return { transactions, addTransaction, updateTransaction, deleteTransaction }
}

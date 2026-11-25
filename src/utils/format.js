const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

export function monthLabel(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
}

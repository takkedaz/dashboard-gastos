export const CATEGORIES = {
  income: [
    { id: 'salario', label: 'Salário', color: '#34d399' },
    { id: 'freelance', label: 'Freelance', color: '#60a5fa' },
    { id: 'investimentos', label: 'Investimentos', color: '#a78bfa' },
    { id: 'outros_receita', label: 'Outros', color: '#94a3b8' },
  ],
  expense: [
    { id: 'alimentacao', label: 'Alimentação', color: '#fb923c' },
    { id: 'transporte', label: 'Transporte', color: '#38bdf8' },
    { id: 'moradia', label: 'Moradia', color: '#f472b6' },
    { id: 'lazer', label: 'Lazer', color: '#facc15' },
    { id: 'saude', label: 'Saúde', color: '#f87171' },
    { id: 'educacao', label: 'Educação', color: '#4ade80' },
    { id: 'outros_despesa', label: 'Outros', color: '#94a3b8' },
  ],
}

export function findCategory(type, categoryId) {
  const list = CATEGORIES[type] || []
  return list.find((c) => c.id === categoryId) || list[list.length - 1]
}

# 💰 Dashboard de Gastos

Dashboard de controle financeiro pessoal construído em React. Permite registrar receitas e despesas, categorizar, filtrar por tipo/mês/busca e visualizar a distribuição dos gastos em um gráfico interativo. Todos os dados ficam salvos no navegador (localStorage), sem precisar de backend.

**[Demo ao vivo](https://takkedaz.github.io/dashboard-gastos/)**

## Funcionalidades

- Cadastro de transações (receita ou despesa) com descrição, valor, categoria e data
- Edição e exclusão de transações
- Resumo com saldo, total de receitas e total de despesas
- Filtros por tipo, mês e busca por texto
- Gráfico de despesas por categoria (Chart.js)
- Persistência local — os dados continuam lá ao recarregar a página
- Layout responsivo

## Tecnologias

- React 19 + Vite
- Chart.js / react-chartjs-2
- CSS puro (sem framework de UI)
- localStorage API

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Estrutura

```
src/
  components/     # Form, lista, filtros, resumo e gráfico
  hooks/          # useTransactions — estado + persistência
  utils/          # categorias e formatação (moeda, data)
  App.jsx         # composição da tela e lógica de filtros
```

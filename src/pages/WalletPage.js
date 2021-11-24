import React from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

function WalletPage() {
  return (
    <>
      <Header />
      <AddExpenseForm />
      <ExpensesTable />
    </>
  )
}

export default WalletPage;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

function ExpensesTable({ expenses, dispatchExpenses }) {
  const [table, setTable] = useState([]);

  function TableHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Currency</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">Converted Value</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Payment Method</TableCell>
          <TableCell align="right">Tag</TableCell>
          <TableCell align="center">Erase</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  function handleClick(id) {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    dispatchExpenses(filteredExpenses);
  }

  function TableRows() {
    if (expenses.length < 1) return '';
    return (
      table.map((expense) => {
        const { id, value, currency, exchangeRates, paymentMethod, description, tag } = expense;
        const convertedValue = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
        return (
          <TableRow key={ id } sx={ { '&:last-child td, &:last-child th': { border: 0 } } }>
            <TableCell component="th" scope="row">{ currency }</TableCell>
            <TableCell align="right">{ parseFloat(value).toFixed(2) }</TableCell>
            <TableCell align="right">{ `R$${ convertedValue.toFixed(2) }` }</TableCell>
            <TableCell align="right">{ description }</TableCell>
            <TableCell align="right">{ paymentMethod }</TableCell>
            <TableCell align="right">{ tag }</TableCell>
            <TableCell align="center"><Button onClick={ () => handleClick(id) }><BackspaceIcon /></Button></TableCell>
          </TableRow>
        )
      })
    )
  }

  useEffect(() => {
    setTable(expenses)
  },[expenses])

  return (
    <section className="main-table">
      <TableContainer>
        <Table>
          <TableHeader />
          <TableBody>
            <TableRows />
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (state) => dispatch(removeExpense(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable)

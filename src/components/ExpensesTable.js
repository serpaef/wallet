import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ExpensesTable({ expenses }) {

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

  function TableRows() {
    if (expenses.length < 1) return '';
    return (
      expenses.map((expense) => {
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
            <TableCell align="center">{ 'delete' }</TableCell>
          </TableRow>
        )
      })
    )
  }

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

export default connect(mapStateToProps, null)(ExpensesTable)

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencies, addExpenses } from '../actions';
import { FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@mui/material';
import './AddExpenseForm.css';

function AddExpenseForm({dispatchCurrencies, dispatchExpenses}) {
  const [id, setId] = useState(0);
  const [currency, setCurrency] = useState('');
  const [currencyList, setCurrencyList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [tag, setTag] = useState('');
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState('');

  const fetchCurrencies = useCallback(async() => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resolve = await request.json();
    delete resolve.USDT;
    dispatchCurrencies([...Object.values(resolve)]);
    setCurrencyList([...Object.keys(resolve)]);
    //returning for use in storing updated exchange rate when adding expenses
    return resolve;
  }, [dispatchCurrencies] )

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies])

  const handleCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
  }
  const handlePaymentChange = ({ target: { value } }) => {
    setPaymentMethod(value);
  }
  const handleTagChange = ({ target: { value } }) => {
    setTag(value);
  }

  const addExpense = async () => {
    const exchangeRates = await fetchCurrencies();
    const obj = {
      id,
      currency,
      value,
      description,
      paymentMethod,
      tag,
      exchangeRates
    };

    dispatchExpenses(obj);
    setId(id + 1);
  }

  return (
    <section className="add-expense">
      <FormControl variant="standard" sx={ { minWidth: 150 } }>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency"
          value={ currency }
          onChange={ handleCurrencyChange }
          label="Currency"
        >
          {currencyList.map((currency, index) => (
            <MenuItem key={index} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={ { minWidth: 150 } }>
        <TextField
          type="number"
          id="value"
          label="Value"
          variant="standard"
          value={ value }
          onChange={({target: {value}}) => { setValue(value)}}
        />
      </FormControl>
      <FormControl variant="standard" sx={ { minWidth: 150 } }>
        <TextField
          id="description"
          label="Description"
          variant="standard"
          value={ description }
          onChange={({target: {value}}) => { setDescription(value)}}  
        />
      </FormControl>
      <FormControl variant="standard" sx={ { minWidth: 150 }}>
        <InputLabel id="payment-label">Payment Method</InputLabel>
        <Select
          labelId="payment-label"
          id="payment-method"
          value={ paymentMethod }
          onChange={ handlePaymentChange }
          label="Payment Method"
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="Debit Card">Debit Card</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={ { minWidth: 150 }}>
        <InputLabel id="tag-label">Tag</InputLabel>
          <Select
            labelId="tag-label"
            id="tag"
            value={ tag }
            onChange={ handleTagChange }
            label="Tag"
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Leisure">Leisure</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
          </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={ addExpense }
        sx={{m: '0 12px'}}
      >
        Add Expense
      </Button>
    </section>
  );
}

AddExpenseForm.propTypes = {
  dispatchCurrencies: PropTypes.func,
  dispatchExpenses: PropTypes.func
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (state) => dispatch(currencies(state)),
  dispatchExpenses: (state) => dispatch(addExpenses(state)),
});

export default connect(null, mapDispatchToProps)(AddExpenseForm);

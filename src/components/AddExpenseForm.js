import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import './AddExpenseForm.css';

function AddExpenseForm() {
  const [currency, setCurrency] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [tag, setTag] = useState('');
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState('');

  const handleCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
  }
  const handlePaymentChange = ({ target: { value } }) => {
    setPaymentMethod(value);
  }
  const handleTagChange = ({ target: { value } }) => {
    setTag(value);
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
          <MenuItem value="BRL">BRL</MenuItem>
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
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="credit-card">Credit Card</MenuItem>
          <MenuItem value="debit-card">Debit Card</MenuItem>
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
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="leisure">Leisure</MenuItem>
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="transport">Transport</MenuItem>
            <MenuItem value="healthcare">Healthcare</MenuItem>
          </Select>
      </FormControl>
    </section>
  );
}

export default AddExpenseForm;

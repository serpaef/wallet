const LOGIN = 'LOGIN';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const CURRENCIES = 'CURRENCIES';

export const doLogin = (value) => ({type: LOGIN, value});
export const addExpenses = (value) => ({ type: ADD_EXPENSES, value });
export const removeExpense = (value) => ({ type: REMOVE_EXPENSE, value });
export const currencies = (value) => ({ type: CURRENCIES, value });

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './Header.css'

function Header({ email, expenses }) {
  const [total, setTotal] = useState(0);

  const sumExpenses = () => {
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => (
      acc + (parseFloat(value) * parseFloat(exchangeRates[currency].ask))
    ), 0);
    setTotal(total);
  };

  useEffect(() => {
    sumExpenses()
  },[expenses])

  return (
    <header className="header">
      <div className="user-info">
        <AccountBalanceWalletIcon sx={ { fontSize: 50, color: '#25ABF1' } } />
        <span>{ email }</span>
      </div>
      <div className="total-expenses">
        <AttachMoneyIcon sx={ { fontSize: '30px' } } />
        <span>BRL {total.toFixed(2)}</span>
      </div>
    </header>
  )
}

Header.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = (state) => ({ email: state.user.email, expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(Header);

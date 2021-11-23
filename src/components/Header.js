import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './Header.css'

function Header({ email }) {
  return (
    <header className="header">
      <div className="user-info">
        <AccountBalanceWalletIcon sx={ { fontSize: 50, color: '#25ABF1' } } />
        <span>{ email }</span>
      </div>
      <div className="total-expenses">
        <AttachMoneyIcon sx={ { fontSize: '30px' } } />
        <span>BRL 12.00</span>
      </div>
    </header>
  )
}

Header.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps, null)(Header);

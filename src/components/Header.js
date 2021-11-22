import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './Header.css'

function Header({email}) {
  return (
    <header className="header">
      <AccountBalanceWalletIcon sx={{fontSize: 50, color: 'white'}} />
      <span>{ email }</span>
      
    </header>
  )
}

Header.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = (state) => ({email: state.user.email});

export default connect(mapStateToProps, null)(Header);

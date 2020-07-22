import { Link } from "@reach/router";
import React from 'react';
import logo from '../../logo.svg';

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Link to="/">Home</Link>
      <Link to="counter">Counter</Link>
      <Link to="about">About- Private Route</Link>
      <Link to="login">Login</Link>
    </header>
  )
}

export default Header

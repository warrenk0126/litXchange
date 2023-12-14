import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Menu mode="horizontal">
    <Menu.Item key="home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="profile">
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="trades">
      <Link to="/trades">Trades</Link>
    </Menu.Item>
    <Menu.Item key="donations">
      <Link to="/donations">Donations</Link>
    </Menu.Item>
  </Menu>
);

export default Navbar;
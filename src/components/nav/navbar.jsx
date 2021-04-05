import React, { Component } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import NavbarLogo from './navbar-logo';
import NavbarItem from './navbar-item';

import '../../scss/nav/_navbar.scss';

export default class Navbar extends Component {
  state = {
    isActive: false
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState((state) => ({ isActive: !state.isActive }));
    return false;
  };

  render() {
    return (
      <nav className={classnames('navbar', 'is-fixed-top')} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavbarLogo />
          <Link
            to="/"
            onClick={this.handleClick}
            role="button"
            className={classnames('navbar-burger', 'burger', {
              'is-active': this.state.isActive
            })}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </div>
        <div
          className={classnames('navbar-menu', {
            'is-active': this.state.isActive
          })}
        >
          <div className="navbar-start">
            <NavbarItem to="/contact" location={this.props.location}>
              Contatti
            </NavbarItem>
            <NavbarItem to="/blog" location={this.props.location}>
              Blog
            </NavbarItem>
            <NavbarItem to="/about" location={this.props.location}>
              About
            </NavbarItem>
            <NavbarItem to="/portfolio" location={this.props.location}>
              Portfolio
            </NavbarItem>
          </div>
        </div>
      </nav>
    );
  }
}

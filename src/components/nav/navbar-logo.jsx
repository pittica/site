import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';

import Sign from '../ui/sign';

import '../../scss/nav/_navbar-logo.scss';

export default class NavbarLogo extends Component {
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
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                appearance {
                  background
                }
              }
            }
          }
        `}
        render={({ site: { siteMetadata: { appearance: { background } } } }) => (
          <Link to="/" className="navbar-logo">
            <Sign color={background} alt={this.props.title} />
          </Link>
        )}
      />
    );
  }
}

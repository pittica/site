import React from 'react';
import { Seo } from '@pittica/gatsby-plugin-seo';

import Navbar from '../nav/navbar';
import Footer from '../footer';
import Main from '../ui/main';

export default class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;

    return (
      <div>
        <Seo title={title} path={location.pathname} />
        <Navbar title={title} location={location} />
        <Main>{children}</Main>
        <Footer />
      </div>
    );
  }
}

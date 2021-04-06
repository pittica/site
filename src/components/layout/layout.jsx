import React from 'react';
import { Seo } from '@pittica/gatsby-plugin-seo';

import Navbar from '../nav/navbar';
import Footer from '../footer';
import Main from '../ui/main';

export default class Layout extends React.Component {
  render() {
    const { children, location, title, description } = this.props;

    return (
      <div>
        <Seo title={title} description={description} path={location.pathname} />
        <Navbar title={title} location={location} />
        <Main>{children}</Main>
        <Footer />
      </div>
    );
  }
}

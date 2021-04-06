import React, { Component } from 'react';

import ListNav from '../nav/list-nav';
import Layout from './layout';
import Header from '../ui/header';
import Section from '../ui/section';

export default class ListLayout extends Component {
  render() {
    const { children, context, location, title, description } = this.props;

    return (
      <Layout location={location} title={title} description={description}>
        <Header title={title} subtitle={description} />
        <Section>{children}</Section>
        <ListNav context={context} />
      </Layout>
    );
  }
}

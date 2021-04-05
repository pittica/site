import React, { Component } from 'react';

import ListNav from '../nav/list-nav';
import Layout from './layout';
import Header from '../ui/header';
import Section from '../ui/section';

import pages from '../../data/pages.json';

export default class ListLayout extends Component {
  render() {
    const { children, context, location } = this.props;

    return (
      <Layout location={location} title={pages[context.slug].title}>
        <Header title={pages[context.slug].title} subtitle={pages[context.slug].description} />
        <Section>{children}</Section>
        <ListNav context={context} />
      </Layout>
    );
  }
}

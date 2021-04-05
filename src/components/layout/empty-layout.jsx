import React, { Component } from 'react';
import Layout from './layout';
import Section from '../ui/section';
import Hero from '../ui/hero';

export default class EmptyLayout extends Component {
  render() {
    const { location, title, value } = this.props;

    return (
      <Layout location={location} title={`${title} "${this.props.value}"`}>
        <Hero title={title} subtitle={value} />
        <Section>Nessun Post Trovato</Section>
      </Layout>
    );
  }
}

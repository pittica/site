import React, { Component } from 'react';

import Layout from '../components/layout/layout';
import Airplane from '../components/ui/gfx/airplane';
import Hero from '../components/ui/hero';
import ContactForm from '../components/contact-form';

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Layout location={this.props.location} title="Contatti">
        <Hero title="Contatti" subtitle="Contatta Pittica" />
        <Airplane active={this.state.active}>
          <ContactForm
            onLoading={({ active }) =>
              this.setState(() => {
                return { active };
              })}
          />
        </Airplane>
      </Layout>
    );
  }
}

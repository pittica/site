import React, { Component } from 'react';

import ErrorLayout from '../components/layout/error-layout';

import image from '../../static/assets/404.svg';

export default class NotFoundPage extends Component {
  render() {
    return <ErrorLayout code="404" image={image} title="Not Found" location={this.props.location} />;
  }
}

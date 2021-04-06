import React, { Component } from 'react';

import ErrorLayout from '../components/layout/error-layout';

import image from '../../static/assets/404.svg';

export default class UnauthorizedPage extends Component {
  render() {
    return <ErrorLayout code="401" image={image} title="Unauthorized" location={this.props.location} />;
  }
}

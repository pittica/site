import React, { Component } from 'react';
import classnames from 'classnames';

export default class Image extends Component {
  render() {
    let className = null;

    switch (this.props.size) {
      case 16:
        className = 'is-16x16';
        break;
      case 24:
        className = 'is-24x24';
        break;
      case 32:
        className = 'is-32x32';
        break;
      case 48:
        className = 'is-48x48';
        break;
      case 64:
        className = 'is-64x64';
        break;
      case 96:
        className = 'is-96x96';
        break;
      case 128:
        className = 'is-128x128';
        break;
      default:
        className = 'is-fullwidth';
        break;
    }

    return (
      <img
        src={this.props.src}
        alt={this.props.title}
        title={this.props.title}
        className={classnames('image', className, this.props.className)}
      />
    );
  }
}

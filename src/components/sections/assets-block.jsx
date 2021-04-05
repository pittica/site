import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Image from '../ui/image';

export default class AssetsBlock extends Component {
  image(entry) {
    let extension = entry.extension ? entry.extension : 'svg';

    return (
      <Image
        src={'/assets/' + this.props.asset + '/' + entry.slug + '.' + extension}
        title={entry.title}
        size={this.props.size}
      />
    );
  }

  content(entry) {
    if (entry.link) {
      return (
        <a href={entry.link} title={entry.title} target="_new">
          {this.image(entry)}
        </a>
      );
    } else {
      return this.image(entry);
    }
  }

  block(entry) {
    return (
      <div
        className={classnames('column', 'is-4-mobile', 'is-3-tablet', 'is-3-desktop', 'is-3-widescreen', 'is-2-fullhd')}
        key={entry.slug}
      >
        {this.content(entry)}
      </div>
    );
  }

  render() {
    if (this.props.entries.length > 0) {
      return (
        <div
          className={classnames('columns', 'is-mobile', 'is-multiline', 'is-vcentered', {
            'is-centered': this.props.centered
          })}
        >
          {this.props.entries.map((entry) => {
            return this.block(entry);
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

AssetsBlock.propTypes = {
  entries: PropTypes.array,
  asset: PropTypes.string,
  size: PropTypes.number,
  centered: PropTypes.bool
};

AssetsBlock.defaultProps = {
  children: null,
  asset: 'technologies',
  size: 96,
  centered: true
};

import React from 'react';
import classnames from 'classnames';
import AssetsBlock from './assets-block';

import technologies from '../../data/technologies.json';

export default class AssetsTechnologies extends AssetsBlock {
  block(entry) {
    if (typeof technologies[entry] !== 'undefined') {
      return (
        <div
          className={classnames(
            'column',
            'is-4-mobile',
            'is-3-tablet',
            'is-3-desktop',
            'is-3-widescreen',
            'is-2-fullhd'
          )}
          key={entry}
        >
          {this.content({
            slug: entry,
            title: technologies[entry].title,
            link: technologies[entry].link
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

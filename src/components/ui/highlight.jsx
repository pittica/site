import React from 'react';
import classnames from 'classnames';

import "../../scss/ui/_highlight.scss";

export default function Highlight({ children, className }) {
  return (
    <div className={classnames('highlight', className)}>
      <span className="highlight-body">{children}</span>
    </div>
  );
}

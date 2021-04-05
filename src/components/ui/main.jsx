import React from 'react';

import '../../scss/ui/_main.scss';

export default function Main({ children }) {
  return (
    <main className="main">
      <div className="inner-page">{children}</div>
    </main>
  );
}

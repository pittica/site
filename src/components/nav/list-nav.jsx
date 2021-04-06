import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import '../../scss/nav/_list-nav.scss';

function Ellipsis({ upper }) {
  return (
    <li key={'page-' + (upper ? 'ellipsis-upper' : 'ellipsis-lower')}>
      <span>...</span>
    </li>
  );
}

function ListItem({ context, page }) {
  let link = '';

  if (context.group) {
    link += '/' + context.group;
  }

  if (context.slug) {
    link += '/' + context.slug;
  }

  if (page > 1) {
    link += '/' + page;
  }

  return (
    <li key={'page-' + page}>
      <Link
        to={link}
        className={classNames({
          current: context.current === page
        })}
      >
        {page}
      </Link>
    </li>
  );
}

function Paginate({ context }) {
  const items = [];

  if (context.pages > 1) {
    items.push(<ListItem context={context} page={1} key="li-0" />);

    if (context.current > 3) {
      items.push(<Ellipsis upper={false} key="ellip-0" />);
    }
  }

  for (let i = 0; i < context.pages; i++) {
    let page = i + 1;

    if (page !== 1 && page !== context.pages && (page < context.current + 2 && page > context.current - 2)) {
      items.push(<ListItem context={context} page={page} key={`li-${i}`} />);
    }
  }

  if (context.pages > 1) {
    if (context.current < context.pages - 2) {
      items.push(<Ellipsis upper={true} key="ellip-1" />);
    }

    items.push(<ListItem context={context} page={context.pages} key={`li-${context.pages}`} />);
  }

  return items;
}

function ListNav({ context }) {
  if (context.pages > 1) {
    return (
      <nav className="list-nav">
        <ul>
          <Paginate context={context} />
        </ul>
      </nav>
    );
  } else {
    return null;
  }
}

export default ListNav;

import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import Table from './src/mdx/shortcodes/table';

import './src/scss/style.scss';

const components = { table: Table };

const wrapRootElement = ({ element }) => <MDXProvider components={components}>{element}</MDXProvider>;

export { wrapRootElement };

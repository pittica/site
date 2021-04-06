import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default function Renderer({ children }) {
  if (children && children.markdownNode) {
    return <MDXRenderer>{children.markdownNode.childMdx.body}</MDXRenderer>;
  } else {
    return null;
  }
}

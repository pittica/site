import React, { Component } from 'react';
import { Seo } from '@pittica/gatsby-plugin-seo';

import Navbar from '../nav/navbar';
import Footer from '../footer';
import Main from '../ui/main';

import '../../scss/layout/_post-layout.scss';

export default class PostLayout extends Component {
  render() {
    const { location, title, children, post, image } = this.props;

    return (
      <div className="post-layout">
        <Seo
          title={title}
          description={post.frontmatter.description || post.excerpt}
          frontmatter={post.frontmatter}
          isBlogPost={true}
          image={image}
          postData={post}
          path={location.pathname}
        />
        <Navbar title={title} location={location} />
        <Main>{children}</Main>
        <Footer />
      </div>
    );
  }
}

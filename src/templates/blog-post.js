import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import PostLayout from '../components/layout/post-layout';
import TagLink from '../components/ui/link/tag-link';
import CategoryLink from '../components/ui/link/category-link';
import ArticleHeader from '../components/ui/article/article-header';

import '../scss/ui/_post.scss';

export default class BlogPostTemplate extends Component {
	render() {
		const post = this.props.data.markdownRemark;
		const { previous, next } = this.props.pageContext;
		const image = post.frontmatter.image ? post.frontmatter.image.childImageSharp.sizes.src : null;

		let categories;
		let tags;

		if (post.frontmatter.categories instanceof Array) {
			categories = post.frontmatter.categories;
		} else {
			categories = [ post.frontmatter.categories ];
		}

		if (post.frontmatter.tags instanceof Array) {
			tags = post.frontmatter.tags;
		} else {
			tags = [ post.frontmatter.tags ];
		}

		return (
			<PostLayout title={post.frontmatter.title} image={image} post={post} location={this.props.location}>
				<article className="blog-post">
					<ArticleHeader image={image}>
						<section className="hero">
							<div className="hero-body">
								<div className="container">
									<h1 className="title">{post.frontmatter.title}</h1>
									{post.frontmatter.description && (
										<h2 className="subtitle">{post.frontmatter.description}</h2>
									)}
									{categories.map((category, index) => (
										<h3 className="subtitle" title="Categoria" key={'category' + index}>
											<CategoryLink category={category} />
										</h3>
									))}
									<h3 className="subtitle">
										<i className="icon-pittica-clock" /> {post.frontmatter.date}
									</h3>
								</div>
							</div>
						</section>
					</ArticleHeader>
					{tags.length > 0 && (
						<div className="container">
							{tags.map((tag, index) => <TagLink tag={tag} key={'tag' + index} />)}
						</div>
					)}
					<div className="container">
						<section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
					</div>
				</article>
				{(previous || next) && (
					<nav className="bottom-nav post-nav">
						<ul>
							<li>
								{previous && (
									<Link to={previous.fields.slug} rel="prev">
										<i className="icon-pittica-arrow-left" /> {previous.frontmatter.title}
									</Link>
								)}
							</li>
							<li>
								{next && (
									<Link to={next.fields.slug} rel="next">
										{next.frontmatter.title} <i className="icon-pittica-arrow-right" />
									</Link>
								)}
							</li>
						</ul>
					</nav>
				)}
			</PostLayout>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "DD/MM/YYYY")
				description
				categories
				tags
				image {
					childImageSharp {
						sizes(maxWidth: 1280) {
							...GatsbyImageSharpSizes
						}
					}
				}
			}
		}
	}
`;

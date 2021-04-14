import React, { Component } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import Renderer from '../mdx/renderer';
import Layout from '../components/layout/layout';
import Section from '../components/ui/section';
import Technologies from '../components/ui/technologies';
import ImageLink from '../components/ui/image-link';
import FeatureLink from '../components/ui/link/feature-link';

import Partners from '../components/sections/partners';

import about from '../../static/assets/about.svg';
import breaker from '../../static/assets/about-breaker.svg';

class AboutPage extends Component {
  render() {
    return (
      <Layout location={this.props.location} title="About">
        <figure className={classnames('image', 'is-128x128')}>
          <img src={about} alt="About" width="1080" height="1080" />
        </figure>
        {this.props.data.about && (
          <Section title={this.props.data.about.title} subtitle={this.props.data.about.subtitle}>
            <Renderer>{this.props.data.about.content}</Renderer>
          </Section>
        )}
        <figure className={classnames('image', 'is-128x128')}>
          <img src={breaker} alt="About" width="1080" height="1080" />
        </figure>
        {this.props.data.services && (
          <Section title={this.props.data.services.title} subtitle={this.props.data.services.subtitle}>
            <Renderer>{this.props.data.services.content}</Renderer>
          </Section>
        )}
        <div className="has-text-centered">
          <FeatureLink to="/services" label="Vedi i nostri servizi" />
        </div>
        {this.props.data.allGraphCmsTechnology.nodes.length > 0 && (
          <Section title="Tecnologie" subtitle="Con cosa lavoriamo?">
            <Technologies nodes={this.props.data.allGraphCmsTechnology.nodes} />
          </Section>
        )}
        {this.props.data.allGraphCmsPartner.nodes.length > 0 && (
          <Section title="Rete Aziendale" subtitle="Le Aziende con cui collaboriamo">
            <div className={classnames('columns', 'is-multiline')}>
              {this.props.data.allGraphCmsPartner.nodes.map((node, i) => {
                return (
                  <div className={classnames('column', 'is-one-third', 'p-6')} key={`partner-${i}`}>
                    <ImageLink link={node.link} title={node.name} image={node.logo} />
                  </div>
                );
              })}
            </div>
          </Section>
        )}
        <Section title="Partner" subtitle="Partnership e Associazioni">
          <Partners />
        </Section>
      </Layout>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
  fragment GraphCMS_SectionFragment on GraphCMS_Section {
    title
    subtitle
    content {
      markdownNode {
        childMdx {
          body
        }
      }
    }
  }

  query {
    allGraphCmsTechnology(filter: { stage: { eq: PUBLISHED } }) {
      nodes {
        link
        name
        logo {
          localFile {
            publicURL
          }
        }
      }
    }
    allGraphCmsPartner(filter: { stage: { eq: PUBLISHED } }) {
      nodes {
        link
        name
        logo {
          localFile {
            publicURL
          }
        }
      }
    }
    about: graphCmsSection(slug: { eq: "about" }, stage: { eq: PUBLISHED }) {
      ...GraphCMS_SectionFragment
    }
    services: graphCmsSection(slug: { eq: "services" }, stage: { eq: PUBLISHED }) {
      ...GraphCMS_SectionFragment
    }
  }
`;

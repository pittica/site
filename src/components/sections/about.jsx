import React from 'react';
import classnames from 'classnames';

import SectionContainer from '../ui/section-container';
import Section from '../ui/section';
import FeatureLink from '../ui/link/feature-link';
import Underground from '../ui/gfx/underground';

const About = () => {
  return (
    <SectionContainer left={false}>
        <Underground />
      <Section title="Pittica" subtitle="Mad Scientists @ Work">
        <div className="container">
          <div className={classnames('columns', 'is-multiline')}>
            <div className={classnames('column', 'is-two-thirds', 'is-offset-one-third')}>
              <p>
                Il tuo partner per la <strong>trasformazione digitale</strong>.
              </p>
              <FeatureLink to="/about" label="Leggi" />
            </div>
          </div>
        </div>
      </Section>
    </SectionContainer>
  );
};

export default About;

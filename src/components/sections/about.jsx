import React from "react"
import FeatureLink from "../ui/link/feature-link"
import Section from "../ui/section"
import Underground from "../ui/gfx/underground"

import "../../scss/ui/_section-container.scss"

const About = () => {
  return (
    <div className="section-container section-right">
      <figure className="image">
        <Underground />
      </figure>
      <Section title="Pittica" subtitle="Mad Scientists @ Work">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-two-thirds is-offset-one-third">
              <p>Il tuo partner per la <strong>trasformazione digitale</strong>.</p>
              <FeatureLink to={`/about`} label="Leggi" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default About

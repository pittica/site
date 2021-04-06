import React, { Component } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import Layout from '../components/layout/layout';
import Section from '../components/ui/section';
import AssetsBlock from '../components/sections/assets-block';
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
        <Section title="About" subtitle="Chi siamo?">
          <p>
            La risposta più corretta sarebbe: "Siamo una realtà di consulenza e sviluppo IT focalizzata soprattutto sul
            web".
          </p>
          <p>
            Vogliamo distaccarci dal tradizionale concetto di Digital Agency. Non volendoci concentrare sul solo aspetto
            operativo, infatti, seguiamo il business del Cliente sotto tutti i punti di vista. E mettiamo l'azienda
            nelle condizioni di portare a termine il percorso di sviluppo suggerito. Questo perché sappiamo quali siano
            i giusti strumenti per poterlo fare.
          </p>
          <p>
            Siamo <strong>consulenti per l'innovazione</strong> impegnati sul fronte dei processi che{' '}
            <strong>elevano e ottimizzano il business di un'azienda</strong>.
            <br />
            Il nostro lavoro consiste nell'analizzare un'impresa per esprimerla al meglio.
          </p>
          <p>
            Lavoriamo insieme alle aziende per sviluppare, potenziare e/o consolidare la loro rete di vendita online e
            offline, ad esempio.
            <br />
            Attraverso attività di comunicazione strategiche, trasformiamo l'identità di un brand in parole e in
            contenuti visual, aiutiamo le aziende ad acquisire nuovi lead, ci occupiamo di attività di marketing pre e
            post-vendita.
            <br />
            Forniamo anche assistenza tecnica e sistemistica. Dal semplice sito Wordpress a elaborati progetti su
            Gatsby, dalla revisione del codice all'attività di project management, dall'applicazione desktop ad App
            progressive: sul piano dello sviluppo informatico, il nostro obiettivo è offrire le migliori tecnologie a
            disposizione.
            <br />
            Ascoltiamo e supportiamo le esigenze del Cliente, prefiggendoci anche di prevenirle.
          </p>
          <p>
            In tutto ciò, abbiamo una certezza: molto (se non tutto) dipende dalla base e dalla logica di un progetto.
            Se entrambe sono adamantine, le probabilità di successo aumentano sensibilmente.
          </p>
        </Section>
        <figure className={classnames('image', 'is-128x128')}>
          <img src={breaker} alt="About" width="1080" height="1080" />
        </figure>
        <Section title="Servizi" subtitle="Cosa facciamo?">
          <ul>
            <li>Consulenza al retail focalizzata sul local business</li>
            <li>Sviluppo di tecnologie web e cloud based</li>
            <li>Implementazione di CMS per la creazione di e-commerce, blog e siti web</li>
            <li>Hosting professionale</li>
            <li>Gestione e-mail</li>
            <li>Consulenza tecnologia e sistemistica</li>
            <li>Comunicazione, copywriting, social media management e advertising</li>
            <li>Produzione di contenuti audiovisivi</li>
            <li>Stampa</li>
            <li>Supporto per selezione risorse umane IT</li>
          </ul>
          <div className="has-text-centered">
            <FeatureLink to="/services" label="Vedi i nostri servizi" />
          </div>
        </Section>
        {this.props.data.allGraphCmsTechnology.nodes.length > 0 && (
          <Section title="Tecnologie" subtitle="Con cosa lavoriamo?">
            <div className={classnames('columns', 'is-multiline')}>
              {this.props.data.allGraphCmsTechnology.nodes.map((element, i) => {
                return (
                  <div
                    className={classnames(
                      'column',
                      'is-4-mobile',
                      'is-3-tablet',
                      'is-3-desktop',
                      'is-3-widescreen',
                      'is-2-fullhd'
                    )}
                    key={`technology-${i}`}
                  >
                    <ImageLink link={element.link} title={element.name} image={element.logo} />
                  </div>
                );
              })}
            </div>
          </Section>
        )}
        <Section title="Rete Aziendale" subtitle="Le Aziende con cui collaboriamo">
          <AssetsBlock
            asset="business-network"
            size={196}
            entries={[
              {
                slug: 'it-easy-informatica',
                link: 'https://www.iteasyinformatica.it/',
                title: 'IT Easy Informatica'
              },
              {
                slug: 'resmart',
                link: 'https://www.resmart.it/',
                title: 'reSmart'
              }
            ]}
          />
        </Section>
        <Section title="Partner" subtitle="Partnership e Associazioni">
          <Partners />
        </Section>
      </Layout>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
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
  }
`;

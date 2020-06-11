import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Section from "../components/ui/section"
import Technologies from "../components/sections/technologies"

import Partners from "../components/sections/partners"

import about from "../../static/assets/about.svg"
import breaker from "../../static/assets/about-breaker.svg"

class AboutPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="About">
        <figure className="image is-128x128">
          <img src={about} alt="About" width="1080" height="1080" />
        </figure>
        <Section title="About" subtitle="Chi siamo?">
          <p>La risposta più corretta sarebbe: "Pittica è un'azienda di consulenza e sviluppo IT, focalizzata principalmente sul web".</p>
          <p>Volendoci distaccare dal concetto di Digital Agency tradizionale, ci piace definirci <strong>consulenti per l'innovazione</strong> in grado di sviluppare i processi che <strong>elevano e ottimizzano il business di un'azienda</strong>.</p>
          <p>Crediamo fortemente che se la base e la logica di un progetto sono adamantine il progetto non possa fallire. Il nostro compito è proprio quello di analizzare il vostro business per fornirvi gli strumenti mirati per conferirgli la migliore espressione.</p>
        </Section>
        <figure className="image is-128x128">
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
        </Section>
        <Section title="Tecnologie" subtitle="Con cosa lavoriamo?">
          <Technologies entries={[
            {
              slug: "php",
              link: "https://www.php.net/",
              title: "PHP"
            },
            {
              slug: "nodejs",
              link: "https://nodejs.org/",
              title: "Node.js"
            },
            {
              slug: "csharp",
              title: "C#"
            },
            {
              slug: "vuejs",
              link: "https://vuejs.org/",
              title: "Vue.js"
            },
            {
              slug: "react",
              link: "https://reactjs.org/",
              title: "React"
            },
            {
              slug: "git",
              link: "https://git-scm.com/",
              title: "Git"
            },
            {
              slug: "css3",
              title: "CSS3"
            },
            {
              slug: "html5",
              title: "HTML5"
            },
            {
              slug: "gatsby",
              link: "https://www.gatsbyjs.org/",
              title: "GatsbyJS"
            },
            {
              slug: "jekyll",
              link: "https://jekyllrb.com/",
              title: "Jekyll"
            },
            {
              slug: "mysql",
              link: "https://www.mysql.com/",
              title: "MySQL"
            },
            {
              slug: "mssql",
              link: "https://www.microsoft.com/sql-server/",
              title: "Microsoft SQL Server"
            },
            {
              slug: "bulma",
              link: "https://bulma.io/",
              title: "Bulma"
            },
            {
              slug: "bootstrap",
              link: "https://getbootstrap.com/",
              title: "Bootstrap"
            },
            {
              slug: "sass",
              link: "https://sass-lang.com/",
              title: "SASS"
            },
            {
              slug: "cakephp",
              link: "https://cakephp.org/",
              title: "CakePHP"
            },
            {
              slug: "prestashop",
              link: "https://www.prestashop.com/",
              title: "PrestaShop"
            },
            {
              slug: "wordpress",
              link: "https://wordpress.org/",
              title: "WordPress"
            }
          ]} />
        </Section>
        <Section title="Partner" subtitle="Partner e Associazioni">
          <Partners />
        </Section>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

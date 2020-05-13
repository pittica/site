import React from "react"
import Layout from "./layout"
import Hero from "../ui/hero"
import Rain from "../ui/gfx/rain"

export default class ErrorLayout extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title={this.props.title}>
        <Rain>
          <Hero title={this.props.code} subtitle={this.props.title} />
          <figure className="image">
            <img src={this.props.image} alt={this.props.code} width="1000" height="700" />
          </figure>
        </Rain>
      </Layout>
    )
  }
}
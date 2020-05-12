import React from "react"
import Image from "../ui/image"

export default class Technologies extends React.Component {
  image(entry) {
    return (<Image src={'/assets/technologies/' + entry.slug + '.svg'} title={entry.title} size={96} />)
  }

  content(entry) {
    if (entry.link) {
      return (
        <a href={entry.link} title={entry.title} target="_new">
          {this.image(entry)}
        </a>
      )
    } else {
      return this.image(entry)
    }
  }

  render() {
    if (this.props.entries.length > 0) {
      return (
        <div className="columns is-mobile is-multiline is-vcentered is-centered">
          {this.props.entries.map((entry) => {
            return (
              <div className="column is-4-mobile is-3-tablet is-3-desktop is-3-widescreen is-2-fullhd" key={entry.slug}>
                {this.content(entry)}
              </div>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }
}

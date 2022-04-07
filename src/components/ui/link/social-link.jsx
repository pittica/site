import React from "react"
import PropTypes from "prop-types"

import Icon from "../icon"

export default function SocialLink({ link, glyph, title }) {
  if (link) {
    return (
      <a href={link} title={title} target="_new">
        <Icon glyph={`icon-pittica-${glyph}`} />
      </a>
    )
  } else {
    return null
  }
}

SocialLink.propTypes = {
  link: PropTypes.string,
  glyph: PropTypes.string.isRequired,
  title: PropTypes.string,
}

SocialLink.defaultProps = {
  glyph: "paperclip",
}

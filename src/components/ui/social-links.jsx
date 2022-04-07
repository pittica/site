import React from "react"
import PropTypes from "prop-types"

import SocialLink from "./link/social-link"

export default function SocialLinks({ linkedIn, email, phone, gitHub, imdb }) {
  if (linkedIn || email || phone || gitHub || imdb) {
    return (
      <p>
        {linkedIn && (
          <SocialLink link={linkedIn} title="LinkedIn" glyph="linkedin" />
        )}
        {gitHub && <SocialLink link={gitHub} title="GitHub" glyph="github" />}
        {imdb && <SocialLink link={imdb} title="IMDb" glyph="imdb" />}
        {email && (
          <SocialLink link={`mailto:${email}`} title={email} glyph="envelope" />
        )}
        {phone && (
          <SocialLink
            link={`tel:${phone.replaceAll(/\s+/g, "-")}`}
            title={phone}
            glyph="phone"
          />
        )}
      </p>
    )
  } else {
    return null
  }
}

SocialLinks.propTypes = {
  linkedIn: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  gitHub: PropTypes.string,
  imdb: PropTypes.string,
}

import React from 'react';

import '../../scss/ui/_social-follow.scss';

export default function SocialFollow({ className, socials: { linkedin, github, facebook } }) {
  if (linkedin || github || facebook) {
    return (
      <div className={className}>
        <h2>Seguici</h2>
        <ul className="social-follow">
          {linkedin && (
            <li>
              <a href={new URL(linkedin.page, 'https://www.linkedin.com/company/').href} title="LinkedIn">
                <i className="icon-pittica-linkedin" />
                <span>LinkedIn</span>
              </a>
            </li>
          )}
          {github && (
            <li>
              <a href={new URL(github.username, 'https://github.com/').href} title="GitHub">
                <i className="icon-pittica-github" />
                <span>GitHub</span>
              </a>
            </li>
          )}
          {facebook && (
            <li>
              <a href={new URL(facebook.page, 'https://www.facebook.com/').href} title="Facebook">
                <i className="icon-pittica-facebook" />
                <span>Facebook</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

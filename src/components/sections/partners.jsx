import React from "react"
import { Link } from "gatsby"
import classnames from "classnames"

import Section from "../ui/section"

import "../../scss/sections/_partners.scss"

export default function Partners({ title, subtitle }) {
  return (
    <Section className="partners" title={title} subtitle={subtitle}>
      <div className={classnames("columns", "is-vcentered", "is-multiline")}>
        <div className={classnames("column", "is-4", "has-text-centered")}>
          <a
            href="https://cloud.withgoogle.com/partners/detail/?id=pittica"
            target="_new"
          >
            <img
              src="/assets/partners/google-cloud.svg"
              alt="Google Cloud"
              width="225"
              height="70"
            />
          </a>
        </div>
        <div className={classnames("column", "is-4", "has-text-centered")}>
          <a
            href="https://cloud.withgoogle.com/partners/detail/?id=pittica"
            target="_new"
          >
            <img
              src="/assets/partners/google-for-education.svg"
              alt="Google for Education"
              width="250"
              height="70"
            />
          </a>
        </div>
        <div className={classnames("column", "is-4", "has-text-centered")}>
          <Link
            to="/iubenda"
            title="iubenda Certified Bronze Partner"
            target="_new"
          >
            <img
              src="https://www.iubenda.com/partner/bronze@2x.png"
              alt="iubenda Certified Bronze Partner"
              width="306"
              height="108"
            />
          </Link>
        </div>
      </div>
    </Section>
  )
}

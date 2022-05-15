import React from "react"

import Section from "../section"
import RelatedBlock from "../../sections/related-block"
import Partners from "../../sections/partners"
import Partnerships from "../../sections/partnerships"
import People from "../../sections/people"
import Technologies from "../../sections/technologies"
import Attachments from "../../sections/attachments"

export default function PageSection({
  section: {
    title,
    subtitle,
    offers,
    services,
    technologies,
    people,
    partners,
    partnerships,
    attachments,
    list,
  },
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <Technologies nodes={technologies} list={list} />
      <RelatedBlock nodes={offers} list={list} group="offers" />
      <RelatedBlock nodes={services} list={list} group="services" />
      <People nodes={people} list={list} />
      <Partners nodes={partners} list={list} />
      <Partnerships nodes={partnerships} list={list} />
      <Attachments nodes={attachments} list={list} />
    </Section>
  )
}

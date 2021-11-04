import React from "react"

import PostBlock from "./post-block"
import PostContent from "./post-content"
import Section from "../section"
import Partners from "../../sections/partners"
import Partnerships from "../../sections/partnerships"
import People from "../../sections/people"
import Technologies from "../../sections/technologies"

export default function PageSection({
  section: {
    title,
    subtitle,
    content,
    offers,
    services,
    technologies,
    people,
    partners,
    partnerships,
  },
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <PostContent content={content} />
      <Technologies nodes={technologies} />
      <PostBlock posts={offers} group="offers" />
      <PostBlock posts={services} group="services" />
      <People nodes={people} />
      <Partners nodes={partners} />
      <Partnerships nodes={partnerships} />
    </Section>
  )
}

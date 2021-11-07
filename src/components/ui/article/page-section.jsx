import React from "react"

import PostContent from "./post-content"
import Section from "../section"
import Offers from "../../sections/offers"
import Partners from "../../sections/partners"
import Partnerships from "../../sections/partnerships"
import People from "../../sections/people"
import Services from "../../sections/services"
import Technologies from "../../sections/technologies"
import Attachments from "../../sections/attachments"

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
    attachments,
    list,
  },
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <PostContent content={content} />
      <Technologies nodes={technologies} list={list} />
      <Offers nodes={offers} list={list} />
      <Services nodes={services} list={list} />
      <People nodes={people} list={list} />
      <Partners nodes={partners} list={list} />
      <Partnerships nodes={partnerships} list={list} />
      <Attachments nodes={attachments} list={list} />
    </Section>
  )
}

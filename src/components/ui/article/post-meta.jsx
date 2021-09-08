import React from "react"

import "../../../scss/ui/article/_post-meta.scss"

export default function PostMeta({ children, title }) {
  return (
    <div className="post-meta" title={title}>
      {children}
    </div>
  )
}

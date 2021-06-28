import React from "react"

export default function ArticleHeader({ children, image, className }) {
  if (image) {
    return (
      <header
        style={{ backgroundImage: `url(${image})` }}
        className={className}
      >
        {children}
      </header>
    )
  } else {
    return <header className={className}>{children}</header>
  }
}

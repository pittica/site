import React from "react"

export default function PrivacyLink({ children }) {
  return (
    <a
      href="https://www.iubenda.com/privacy-policy/29008249"
      title="Politica sulla Privacy"
      target="_system"
    >
      {children || "Politica sulla Privacy"}
    </a>
  )
}

import React from "react"

export default function Table({ children }) {
  return (
    <div className="table-container">
      <table className="table">{children}</table>
    </div>
  )
}

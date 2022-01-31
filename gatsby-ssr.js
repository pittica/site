import React from "react"

export { wrapPageElement } from "./gatsby-browser"

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({
    itemScope: true,
    itemType: "http://schema.org/WebPage",
    className: "has-navbar-fixed-top",
  })
  setHeadComponents([
    <script
      charSet="utf-8"
      type="text/javascript"
      src="//js-eu1.hsforms.net/forms/shell.js"
    ></script>,
  ])
}

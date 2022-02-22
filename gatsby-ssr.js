export { wrapPageElement } from "./gatsby-browser"

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    itemScope: true,
    itemType: "http://schema.org/WebPage",
    className: "has-navbar-fixed-top",
  })
}

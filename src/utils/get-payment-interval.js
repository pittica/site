export default function getPaymentInterval(post) {
  switch (post.base) {
    case "montly":
      return "al mese"
    case "yearly":
      return "all'anno"
    case "daily":
      return "al giorno"
    case "weekly":
      return "a settimana"
    default:
      return ""
  }
}

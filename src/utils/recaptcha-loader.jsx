export const ReCaptchaLoader = () => {
  const script = document.createElement('script')

  script.src = `https://www.google.com/recaptcha/api.js?render=explicit`

  document.body.appendChild(script)
}

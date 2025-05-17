import { loginPage } from "./js/auth.js"

document.addEventListener('DOMContentLoaded', () => {
   history.pushState(null, null, "/")
   loginPage()
})
import { loginPage } from "./js/auth.js"
import { homePage } from "./js/homePage.js"

document.addEventListener('DOMContentLoaded', () => {
   history.pushState(null, null, "/")
   loginPage()
})
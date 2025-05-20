import { homePage } from "./js/homePage.js"

document.addEventListener('DOMContentLoaded', () => {
   history.pushState(null, null, "/")
   homePage()
})
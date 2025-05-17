import { loginPage } from "./js/auth.js"

export function navigateTo(url) {
    history.pushState(null, null, url)
    router()
}

function router() {
    let routes = [
        { path: "/", view: "" },
        { path: "/login", view: loginPage }
    ]

    let potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(p => p.isMatch)
    if (!match) {
        console.log('Page not found')
        return
    }

    match.route.view()
}

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('/login')
})
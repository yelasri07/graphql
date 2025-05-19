import { loginPage } from "./auth.js"
import { fetchUserData } from "./graphqlRequest.js"

function header() {
    return /*html*/`
        <header>
            <nav>
                <a href="/" class="logo">GRAPHQL</a>
                <a href="/">Logout</a>
            </nav>
        </header>
    `
}

export async function homePage() {
    let data = await fetchUserData()
    if (!data) {
        loginPage()
        return
    }

    console.log(data)

    document.body.innerHTML = /*html*/`
        ${header()}
        <h1>Hello Youssef</h1>
    `
}

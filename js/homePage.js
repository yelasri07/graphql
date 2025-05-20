import { loginPage, logout } from "./auth.js"
import { fetchUserData } from "./graphqlRequest.js"

function header() {
    return /*html*/`
        <header>
            <nav>
                <a href="/" class="logo">GRAPH<span>QL</span></a>
                <button class="logout">Logout <i class="fa-solid fa-right-from-bracket"></i></button>
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

    let userAttrs = data.data.user[0].attrs

    console.log(userAttrs)

    document.body.innerHTML = /*html*/`
        ${header()}
        <main class="container">
            <section class="infos">
                <h1>${userAttrs.email}</h1>
            </section>
        </main>
    `

    logout()
}

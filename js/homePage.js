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

    // console.log(data)

    document.body.innerHTML = /*html*/`
        ${header()}
        <main>
            <section class="infos">

            </section>
        </main>
    `

    logout()
}

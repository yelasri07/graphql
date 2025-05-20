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

    let userInfos = data.data.user[0]

    console.log(userInfos)

    document.body.innerHTML = /*html*/`
        ${header()}
        <main class="container">
            <section class="infos">
                <div class="level"><span>Level</span> 26</div>
                <div class="profile">
                    <h2>${userInfos.login}</h2>
                    <h2>${userInfos.email}</h2>
                    <h2>${userInfos.firstName}</h2>
                    <h2>${userInfos.lastName}</h2>
                </div>
                <div class="xp"></div>
            </section>
        </main>
    `

    logout()
}

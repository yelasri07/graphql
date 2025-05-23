import { convertXPToReadable } from "../utils/convert.js"
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
    let userLevel = data.data.level[0]
    let userTotalXp = data.data.xpTotal.aggregate.sum

    console.log(userInfos)
    console.log(userLevel)
    console.log(userTotalXp)

    document.body.innerHTML = /*html*/`
        ${header()}
        <main class="container">
            <section class="infos">
                <div class="profile">
                    <h2>${userInfos.login}</h2>
                    <h2>${userInfos.email}</h2>
                    <h2>${userInfos.firstName} ${userInfos.lastName}</h2>
                </div>
                <div class="level"><span>Level</span> ${userLevel.amount}</div>
                <div class="ratio"><span>Ratio</span> ${userInfos.auditRatio.toFixed(1)}</div>
                <div class="xp"><span>XP</span> ${convertXPToReadable(userTotalXp.amount)}</div>
            </section>
        </main>
    `

    logout()
}

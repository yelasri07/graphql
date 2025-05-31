import { convertXPToReadable } from "../utils/convert.js"
import { loginPage, logout } from "./auth.js"
import { displayProjectsProgress } from "./projects.js"
import { fetchUserData } from "./graphqlRequest.js"
import { displaySkills } from "./skills.js"

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
        localStorage.removeItem("Token")
        loginPage()
        return
    }

    let userInfos = data.data.user[0]
    let userLevel = data.data.level[0]
    let userTotalXp = data.data.xpTotal.aggregate.sum
    let projects = data.data.projects
    let skills = data.data.skills

    document.body.innerHTML = /*html*/`
        ${header()}
        <main class="container">
            <section style="display:none;" class="infos">
                <div class="profile">
                    <div>
                        <img class="imgProfile" src="https://discord.zone01oujda.ma/assets/pictures/${userInfos.login}.jpg">
                        <h2>${userInfos.login}</h2>
                    </div>
                    <p class="firstLastName">${userInfos.firstName} ${userInfos.lastName}</p>
                    <p><i class="fa-solid fa-envelope"></i> ${userInfos.email}</p>
                    <p><i class="fa-solid fa-phone"></i> ${userInfos.attrs.tel}</p>
                    <p><i class="fa-solid fa-city"></i> ${userInfos.attrs.city}</p>
                </div>
                <div class="amounts">
                    <div class="level"><span>Level</span> ${userLevel.amount}</div>
                    <div class="ratio"><span>Ratio</span> ${userInfos.auditRatio.toFixed(1)}</div>
                    <div class="xp"><span>XP</span> ${convertXPToReadable(userTotalXp.amount)}</div>
                </div>
            </section>
            <section style="display:none; class="projects">
                 <div class="details"></div>
                <svg id="chart" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;"></svg>
            </section>
            <section class="skills">
                <svg id="skills-chart" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;"></svg>
            </section>
        </main>
    `

    displayProjectsProgress(projects)
    displaySkills(skills)
    logout()
}

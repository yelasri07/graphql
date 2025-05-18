import { homePage } from "./homePage.js"

export function loginPage() {
    document.body.innerHTML = /*html*/`
        <form class="loginForm">
            <h2>Login</h2>
            <label for="login">Email or Username</label>
            <input name="login" type="text" id="login">
            <label for="password">Password</label>
            <input name="password" type="password" id="password">
            <button type="submit">Login</button>
        </form>
    `

    login()
}

function login() {
    let formElement = document.querySelector('.loginForm')
    formElement.addEventListener('submit', async e => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(formElement).entries());

        try {
            let response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${btoa(`${formData.login}:${formData.password}`)}`
                }

            })

            if (!response.ok) {
                console.log('user not found')
            } else {
                let token = await response.json()
                localStorage.setItem('Token', token)
                homePage()
            }

        } catch (err) {
            console.error(err)
            return
        }

    })
}
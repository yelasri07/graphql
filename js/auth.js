import { homePage } from "./homePage.js"

export function loginPage() {
    document.body.innerHTML = /*html*/`
        <div class="login-form">
            <form class="loginForm">
                <div class="welcome">
                    <h3>WELCOME</h3>
                </div>
                <div class="authForm">
                    <h2>Sign in</h2>  
                    <div>
                        <input name="login" type="text" id="login" placeholder="Email or Username">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <input name="password" type="password" id="password" placeholder="Password">
                        <i class="fa-solid fa-lock"></i>
                        <span class="showPassword"><i class="fa-solid fa-eye"></i></span>
                    </div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
        </div>
    `

    login()
    showPassword()
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

function showPassword() {
    let showPassword = document.querySelector('.showPassword')

    showPassword.addEventListener('click', () => {
        console.log(showPassword)
    })
}
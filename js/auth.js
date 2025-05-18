import { homePage } from "./homePage.js"

export function loginPage() {
    document.body.innerHTML = /*html*/`
        <div class="login-form">
            <form class="loginForm">
                <div class="welcome">
                    <div>
                        <h3>WELCOME</h3>
                        <p class="subtitle">Log in to view your personal information</p>
                    </div>
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                </div>
                <div class="authForm">
                    <div>
                        <h2>Sign in</h2>  
                        <span class="error"></span>
                    </div>
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
    let spanErr = formElement.querySelector('.error')

    formElement.addEventListener('submit', async e => {
        e.preventDefault()

        spanErr.innerHTML = ''

        const formData = Object.fromEntries(new FormData(formElement).entries());

        try {
            let response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${btoa(`${formData.login}:${formData.password}`)}`
                }

            })

            let data = await response.json()

            if (!response.ok) {
                spanErr.innerHTML = data.error
            } else {
                localStorage.setItem('Token', data)
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
    let password = document.querySelector('#password')

    showPassword.addEventListener('click', () => {
        if (showPassword.innerHTML.trim() == '<i class="fa-solid fa-eye"></i>') {
            password.type = "text"
            showPassword.innerHTML = /*html*/`
                <i class="fa-solid fa-eye-slash"></i>
            `
        } else {
            password.type = "password"
            showPassword.innerHTML = /*html*/`
                <i class="fa-solid fa-eye"></i>
            `
        }
    })
}
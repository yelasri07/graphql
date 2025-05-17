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

    let formElement = document.querySelector('.loginForm')
    formElement.addEventListener('submit', e => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(formElement).entries());

        console.log(formData);
    })
}
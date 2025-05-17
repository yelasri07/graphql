export function loginPage() {
    document.body.innerHTML = /*html*/`
        <form>
            <h2>Login</h2>
            <label for="login">Email or Username</label>
            <input type="text" id="login">
            <label for="password">Password</label>
            <input type="password" id="password">
            <button type="submit">Login</button>
        </form>
    `

    
}
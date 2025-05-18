function header() {
    return /*html*/`
        <header>
            <nav>
                <a href="/" class="logo">GRAPHQL</a>
                <a href="/">Logout</a>
            </nav>
        </header>
    `
}

export function homePage() {
    document.body.innerHTML = /*html*/`
        ${header()}
        <h1>Hello Youssef</h1>
    `
}
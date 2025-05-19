export async function fetchUserData() {
    let token = localStorage.getItem('Token')

    const query = `
        query {
            user {
                id
                attrs
            }
        }
    `

    try {
        let response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })

        let data = await response.json()

        if (!response.ok) {
            console.error("Fetch error:", data)
            return false
        } else {
            if (data.errors) {
                return false
            }
            return data
        }

    } catch (err) {
        console.error(err)
        return false
    }
}
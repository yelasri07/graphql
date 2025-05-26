export async function fetchUserData() {
    let token = localStorage.getItem('Token')

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

const query = `
    {
   user {
  	  login
      email
      firstName
      lastName
      auditRatio
    }
  
  level: transaction (where : {_and :[
    {type : { _eq :"level"}}
  	{path : {_like :"%module%"}}
  ]}
    order_by : {amount : desc} 
    limit: 1
  ) {
  	type 
    amount
    path
  }

    xpTotal : transaction_aggregate(where : {_and :[
    {type : { _eq :"xp"}}
  	{event:{object:{name:{_eq:"Module"}}}}
  	# {path : {_like :"%module%"}}
  ]}
    # order_by : {amount : desc} 
  ) {
    aggregate	{
      sum {
        amount
      }
    }
  }

    projects: transaction (where: {_and: [
    {type: {_eq: "xp"}},
    {event:{object:{name:{_eq:"Module"}}}}
    {object: {type: {_eq: "project"}}}
  ]}) {
    type
      object {
        name
        type
        
      }
    amount
    createdAt
  }

    skills: transaction(
    where: {
      type: {_ilike: "%skill%"}
    }
    order_by: {amount: desc}
  ) {
    type
    amount
    path
  }
}
`
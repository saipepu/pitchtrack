import { api } from '@/app/_api/api'

export const createEvent = async ({ orgId, event }) => {
        
      console.log("CREATE EVENT...")
      const response = await fetch(`${api}/orgs/${orgId}/event`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
        },
        body: JSON.stringify(event)
      })
      .then(response => response.json())
      .catch(error => console.log(error))
    
      return response
        
    }
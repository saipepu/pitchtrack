import { api } from '@/app/_api/api'

export const createEvent = async ({ event }) => {
        
      console.log("Creating event")
      const response = await fetch(`${api}/events`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      })
      .then(response => response.json())
      .catch(error => console.log(error))
    
      return response
        
    }
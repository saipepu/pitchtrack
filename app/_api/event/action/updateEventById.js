import { api } from '@/app/_api/api'

export const updateEventById = async ({ eventId, event }) => {
        
      console.log("UPDATE EVENT BY ID...")
      const response = await fetch(`${api}/events/${eventId}`, {
        method: "PUT",
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
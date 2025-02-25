import { api, token } from '@/app/_api/api'

export const getEventById = async ({ eventId }) => {
      
    console.log("GET EVENT BY ID...")
    const response = await fetch(`${api}/events/${eventId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
      }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response
      
  }
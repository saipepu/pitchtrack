import { api } from '@/app/_api/api'

export const getEventById = async ({ eventId }) => {
      
    console.log("Getting event by id")
    const response = await fetch(`${api}/events/${eventId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response
      
  }
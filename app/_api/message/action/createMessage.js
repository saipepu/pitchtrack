import { api } from '@/app/_api/api'

export const createMessage = async ({ eventId, message }) => {
        
    console.log("Creating message")
    const response = await fetch(`${api}/events/${eventId}/messages`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response
      
}
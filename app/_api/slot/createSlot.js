import { api } from '@/app/_api/api'

export const createSlot = async ({ eventId, slot }) => {
        
    console.log("Creating slot")
    const response = await fetch(`${api}/events/${eventId}/slots`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(slot)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response

}
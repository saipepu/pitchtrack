import { api } from '@/app/_api/api'

export const updateSlot = async ({ eventId, slotId, slot }) => {
        
    console.log("Updating slot")
    const response = await fetch(`${api}/events/${eventId}/slots/${slotId}`, {
      method: "PUT",
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
import { api } from '@/app/_api/api'

export const deleteSlot = async ({ eventId, slotId }) => {
        
    console.log("Updating slot")
    const response = await fetch(`${api}/events/${eventId}/slots/${slotId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response

}
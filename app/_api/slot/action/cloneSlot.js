import { api } from '@/app/_api/api'

export const cloneSlot = async ({ eventId, slotId }) => {
        
    console.log("CREATE SLOT...")
    const response = await fetch(`${api}/events/${eventId}/slots/${slotId}/clone`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response
}
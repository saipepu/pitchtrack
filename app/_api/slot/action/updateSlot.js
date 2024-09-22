import { api } from '@/app/_api/api'

export const updateSlot = async ({ eventId, slotId, slot }) => {
        
    console.log("UPDATE SLOT...")
    const response = await fetch(`${api}/events/${eventId}/slots/${slotId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
      },
      body: JSON.stringify(slot)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response

}
import { api } from '@/app/_api/api'

export const updateAllSlot = async ({ eventId, slots }) => {
    
  console.log(eventId)
    console.log("UPDATE SLOT...")
    const response = await fetch(`${api}/events/${eventId}/slots`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
      },
      body: JSON.stringify(slots)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response

}
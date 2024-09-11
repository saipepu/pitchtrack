import { api } from '@/app/_api/api'

export const updateMessage = async ({ eventId, messageId, message }) => {
        
    console.log("Updating slot")
    const response = await fetch(`${api}/events/${eventId}/messages/${messageId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
      },
      body: JSON.stringify(message)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response

}
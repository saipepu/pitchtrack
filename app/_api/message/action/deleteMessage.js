import { api } from '@/app/_api/api'

export const deleteMessage = async ({ eventId, messageId }) => {
        
    console.log("DELETE MESSAGE...")
    const response = await fetch(`${api}/events/${eventId}/messages/${messageId}`, {
      method: "DELETE",
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
import { api } from '@/app/_api/api'

export const deleteEvent = async ({ orgId, eventId }) => {
        
  console.log("DELETE EVENT...")
  const response = await fetch(`${api}/orgs/${orgId}/event/${eventId}`, {
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
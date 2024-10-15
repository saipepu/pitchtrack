import { api } from '@/app/_api/api'

export const cloneEvent = async ({ orgId, eventId }) => {
        
  console.log("CLONE EVENT...")
  const response = await fetch(`${api}/orgs/${orgId}/event/${eventId}/clone`, {
    method: "POST",
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
import { api, token } from '@/app/_api/api'

export const getAllEvents = async () => {
    
  console.log("GET ALL EVENTS...")
  const response = await fetch(`${api}/events`, {
    method: "GET",
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
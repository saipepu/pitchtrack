import { api, token } from '@/app/_api/api'

export const getOrgById = async ({ id }) => {
    
  console.log("Getting all events")
  const response = await fetch(`${api}/orgs/${id}`, {
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
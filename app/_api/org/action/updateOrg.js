import { api, token } from '@/app/_api/api'

export const updateOrg = async ({ id, dto }) => {
    
  console.log("UPDATE ORG BY ID...")
  const response = await fetch(`${api}/orgs/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("pitchtrack-token") || ""
    },
    body: JSON.stringify(dto)
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  return response
    
}
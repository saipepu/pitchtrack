import { api } from '@/app/_api/api'

export const signUp = async ({ dto }) => {
        
  console.log("REGISTER...")
  const response = await fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  return response
    
}
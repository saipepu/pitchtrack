import { api } from '@/app/_api/api'

export const signIn = async ({ dto }) => {
        
  console.log("LOGIN...")
  const response = await fetch(`${api}/login`, {
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
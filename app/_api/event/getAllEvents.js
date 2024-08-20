import { api } from '@/app/_api/api'

export const getAllEvents = async () => {
    
  console.log("Getting all events")
  const response = await fetch(`${api}/events`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  return response
    
}
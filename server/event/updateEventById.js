"use server";
import { api } from '@/server/api'

export const updateEventById = async ({ event, eventId }) => {
  
  console.log("Updating event")
  console.log(event)
  const response = await fetch(`${api}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(event)
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  return response
  
}
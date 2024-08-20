"use server"
import { api } from '@/server/api'

export const createEvent = async ({ event }) => {

  console.log("Creating event")
  const response = await fetch(`${api}/events`, {
    method: "POST",
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
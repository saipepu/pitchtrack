"use server"

import { api } from '@/server/api'

export const getOneEvent = async ({ eventId }) => {
    
  console.log("Getting one event")
  const response = await fetch(`${api}/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  return response
  
}
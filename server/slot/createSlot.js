"use server";

import { api } from '@/server/api'

export const createSlot = async ({ eventId, slot }) => {
  
    console.log("Creating slot")
    const response = await fetch(`${api}/events/${eventId}/slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(slot)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
  
    return response
  
}
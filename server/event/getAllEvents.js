"use server";
import { api } from '@/server/api'

export const getAllEvents = async () => {
  
    console.log("Getting all events")
    const response = await fetch(`${api}/events`, {
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
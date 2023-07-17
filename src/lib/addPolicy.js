import { getUserById } from "./getUsers";
import {URL}  from '../config';


export default async function addPolicy (payloadArg, clientId) {
  try{
    const payload = {
      client_id : clientId,
      ...payloadArg
    };
    
    const response= await fetch(`${URL}/policy`,   
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'content-type': 'application/json'},
      })
      if (!response.ok) throw new Error('something went wrong');
      return await getUserById(clientId);
  } catch (e) {
    console.log(e);
  }
}

import { getUserById } from "./getUsers";
import {URL} from '../config';


export default async function submitPolicy (payload, clientId) {
  try{
    const { id } = payload;
    const response=await fetch(`${URL}/policy/${id}`,   
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {'content-type': 'application/json'},
      })
      if (!response.ok) throw new Error('something went wrong');
      return await getUserById(clientId);
  } catch (e) {
    console.log(e);
  }
}

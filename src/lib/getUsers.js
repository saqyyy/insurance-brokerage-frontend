import {URL} from '../config';

export default async function getUsers () {
  try {
    const response = await fetch(URL, {cache: 'no-cache'});
    if (!response.ok) throw new Error('something went wrong');
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(URL +"/" + id, {cache: 'no-cache'});
    if (!response.ok) throw new Error('something went wrong');
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export default async function getUsers () {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/clients", {cache: 'no-cache'});
    if (!response.ok) throw new Error('something went wrong');
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/clients/" + id, {cache: 'no-cache'});
    if (!response.ok) throw new Error('something went wrong');
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

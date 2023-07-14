
export default async function addPolicy (payload) {
  try{
    const response= await fetch(`http://127.0.0.1:8000//clients/policy`,   
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'content-type': 'application/json'}
      })
      if (!response.ok) throw new Error('something went wrong');
      return await response.json();
  } catch (e) {
    console.log(e);
  }
}

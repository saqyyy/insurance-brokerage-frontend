export default async function submitPolicy (payload) {
  try{
    const { id } = payload;
    const response=await fetch(`http://127.0.0.1:8000/clients/policy/${id}`,   
      {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {'content-type': 'application/json'}
      })
      if (!response.ok) throw new Error('something went wrong');
      return await response.json();
  } catch (e) {
    console.log(e);
  }
}

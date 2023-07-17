import React, {useState, useEffect} from 'react'
import UserCard from '../components/UserCard';
import getUsers from '../lib/getUsers';


const Home = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
   const getData = async () => {
      const {data} = await getUsers();
      setUsers(data);
    }
    getData();
  }, []);

  return (
    <div className='pages-wrap'>
      <div className='container'>
        <div className='title-head'>
          <h2>Clients</h2>
        </div>
        <div className='users-row'>
              {users.length > 0 && 
                users.map((user) => {
                  return (
                    <div key={user.id} className='user-col'>
                      <UserCard userData={user} />
                    </div>
                  )
                })
              }
        </div>
      </div>
    </div>
  )
}

export default Home

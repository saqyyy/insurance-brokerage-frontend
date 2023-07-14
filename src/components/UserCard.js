
import { useNavigate } from 'react-router-dom';

function UserCard( {userData}) {
  const navigate = useNavigate();
  const timestamp = new Date(userData.created_at);
  const formattedDate = timestamp.toLocaleDateString();

  return (
    <div className='user-card'>
      <div>
        <h3>{userData.name}</h3>
        <span>{formattedDate}</span>
        <p>{userData.description}</p>
      </div>
      <button className='primary-btn'
          onClick={() => navigate(`/details/${userData.id}`, { state: userData })}
        >
          Details
        </button>
    </div>
  );

}

export default UserCard;

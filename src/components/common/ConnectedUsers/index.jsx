import { useEffect, useState } from 'react';
import { getConnections } from '../../../api/FirestoreAPI';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currentUser.userId, user.id, setIsConnected);
  }, [currentUser.userId, user.id]);
  return isConnected ? (
    <></>
  ) : (
    <div className="connected-users-main">
      <img
        className="connected-users-image"
        src={user.imageLink}
        alt="user-image"
      />
      <p className="connected-users-name">{user.name}</p>
      <p className="connected-users-headline">{user.headline}</p>
      <button
        onClick={() => getCurrentUser(user.id)}
        className="connected-users-btn"
      >
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

import { getAllUsers, addConnection } from '../api/FirestoreAPI';
import ConnectedUsers from './common/ConnectedUsers';
import '../Sass/ConnectionsComponent.scss';

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);

  const getCurrentUser = (id) => {
    addConnection(currentUser.userId, id);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.userId ? (
          <></>
        ) : (
          <ConnectedUsers
            user={user}
            getCurrentUser={getCurrentUser}
            currentUser={currentUser}
            key={user.userID}
          />
        );
      })}
    </div>
  );
}

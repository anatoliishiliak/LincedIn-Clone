import React, { useState } from 'react';
import ProfileCard from './common/ProfileCard';
import ProfileEdit from './common/ProfileEdit';
import '../Sass/ProfileComponent.scss';

export default function ProfileComponent({ currentUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className="profile-main">
      {isEdit ? (
        <ProfileEdit currentUser={currentUser} onEdit={onEdit} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { editProfile } from '../../../api/FirestoreAPI';
import { AiOutlineClose } from 'react-icons/ai';
import './index.scss';

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileData = async () => {
    await editProfile(currentUser?.userId, editInputs);
    await onEdit();
  };
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="edit-icon" onClick={onEdit} />
      </div>
      <div className="profile-edit-input">
        <label>Name*</label>
        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Headline"
          name="headline"
          value={editInputs.headline}
        />
        <label>Country</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Company"
          name="company"
          value={editInputs.company}
        />
        <label>Industry</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>

        <textarea
          onChange={getInput}
          className="edit-textarea"
          rows={5}
          placeholder="About Me"
          name="about"
          value={editInputs.about}
        />
        <label>Skills</label>

        <input
          onChange={getInput}
          className="edit-input"
          placeholder="Skills"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-btn-container">
        <button onClick={updateProfileData} className="save-btn">
          Save Changes
        </button>
      </div>
    </div>
  );
}

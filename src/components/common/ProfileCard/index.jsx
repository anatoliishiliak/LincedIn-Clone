import { useEffect, useMemo, useState } from 'react';
import { getSingleStatus, getSingleUser } from '../../../api/FirestoreAPI';
import PostsCard from '../PostsCard';
import { HiOutlinePencil } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import FileUploadModal from '../FileUploadModal';
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload';
import './index.scss';

export default function ProfileCard({ currentUser, onEdit }) {
  let location = useLocation();
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser?.userId,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatuses, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  return (
    <>
      <FileUploadModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImage={uploadImage}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={currentProfile?.imageLink}
              alt="profile-image"
            />
            <h3 className="user-name">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="headline">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                : `${currentProfile?.city}, ${currentProfile?.country}`}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? currentUser.website
                : currentProfile?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="industry">
              {Object.values(currentProfile).length === 0
                ? currentUser.industry
                : currentProfile?.industry}
            </p>
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about">
          {Object.values(currentProfile).length === 0
            ? currentUser.about
            : currentProfile?.about}
        </p>
        <p className="skills">
          <span className="skills-label">Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? currentUser.skills
            : currentProfile?.skills}
        </p>
      </div>
      <div className="post-status-main">
        <div className="post-card-container">
          {allStatuses?.map((posts) => {
            return (
              <div key={posts.id}>
                <PostsCard posts={posts} id={posts.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

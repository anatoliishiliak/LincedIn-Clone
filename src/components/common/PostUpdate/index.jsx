import React, { useState, useMemo } from 'react';
import { postStatus, getStatus, updatePost } from '../../../api/FirestoreAPI';
import ModalComponent from '../Modal';
import PostsCard from '../PostsCard';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { getUniqueId } from '../../../helpers/getUniqueId';
import './index.scss';

export default function PostStatus({ currentUser }) {
  let userEmail = localStorage.getItem('userEmail');
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState('');
  const sendStatus = async () => {
    let object = {
      status,
      timeStamp: getCurrentTimeStamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId: getUniqueId(),
      userID: currentUser.userId,
      postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus('');
  };

  const getEditData = (posts) => {
    setStatus(posts?.status);
    setCurrentPost(posts);
    setModalOpen(true);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatuses);
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <div className="background-image">Profile background image</div>
        <img
          className="user-details-image"
          src={currentUser.imageLink}
          alt="user-image"
        />
        <p className="user-details-name">{currentUser.name}</p>
        <p className="user-details-headline">{currentUser.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="user-post-status-image"
          src={currentUser.imageLink}
          alt="user-image"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>
      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        postImage={postImage}
        setPostImage={setPostImage}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
      />
      <div className="post-card-container">
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard
                posts={posts}
                id={posts.id}
                getEditData={getEditData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

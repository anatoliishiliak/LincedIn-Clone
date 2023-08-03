import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Modal } from 'antd';
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from '../../../api/FirestoreAPI';
import LikeButton from '../LikeButton';
import './index.scss';

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.userId, posts.userID, setIsConnected);
  }, [currentUser.userId, posts.userID]);

  return isConnected || currentUser.userId === posts.userID ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser?.userId === posts?.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts?.id)}
            />
          </div>
        ) : (
          <></>
        )}
        <img
          className="post-user-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          onClick={() =>
            navigate('/profile', {
              state: { id: posts?.userID, email: posts.userEmail },
            })
          }
          alt="profile-image"
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate('/profile', {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.userId === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {
              allUsers.filter((user) => user.userId === posts.userID)[0]
                ?.headline
            }
          </p>
          <p className="time-stamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          className="post-image"
          src={posts.postImage}
          alt="post-image"
          onClick={() => setImageModal(true)}
        />
      ) : (
        <></>
      )}
      <div
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></div>
      <LikeButton
        userId={currentUser?.userId}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        {
          <img
            className="post-image modal"
            src={posts.postImage}
            alt="post-image"
            onClick={() => setImageModal(false)}
          />
        }
      </Modal>
    </div>
  ) : (
    <></>
  );
}

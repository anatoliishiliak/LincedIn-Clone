import React, { useState } from 'react';
import { Modal, Button, Progress } from 'antd';
import { AiOutlinePicture } from 'react-icons/ai';
import { uploadPostImage } from '../../../api/ImageUpload';
import ReactQuill from 'react-quill';

import './index.scss';

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  updateStatus,
  postImage,
  setPostImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          setStatus('');
          setPostImage('');
          setCurrentPost({});
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus('');
          setPostImage('');
          setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? 'Update' : 'Post'}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="What do You want to share?.."
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}

          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="post-image"
            />
          ) : (
            <></>
          )}
        </div>
        <label htmlFor="picture-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="picture-upload"
          type="file"
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};

export default ModalComponent;

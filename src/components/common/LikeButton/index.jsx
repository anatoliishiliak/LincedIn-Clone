import React, { useEffect, useMemo, useState } from 'react';
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from '../../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import './index.scss';
import { AiOutlineLike, AiFillLike, AiOutlineComment } from 'react-icons/ai';

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const handleLike = () => {
    likePost(userId, postId, liked);
  };
  const getComment = (event) => {
    setComment(event.target.value);
  };
  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp('LLL'), currentUser?.name);
    setComment('');
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLikesCount, setLiked);
    getComments(postId, setComments);
  }, [userId, postId]);
  return (
    <div className="like-container">
      <p>{likesCount} People liked this post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiFillLike className="like-icon" size={30} color="#0072b1" />
          ) : (
            <AiOutlineLike className="like-icon" size={30} />
          )}
          <p className={liked ? 'blue' : 'gray'}>Like</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            className="like-icon"
            size={30}
            color={showCommentBox ? '#0072b1' : '#212121'}
          />
          <p className={showCommentBox ? 'blue' : 'gray'}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            name="comment"
            placeholder="Add a comment"
            className="comment-input"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="comments-name">{comment.name}</p>

                  <p className="comment">{comment.comment}</p>
                  <p className="timestamp">{comment.timeStamp}</p>
                  {/* <p>•</p> */}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import noImage from '../assets/no-image.png';

const Post = ({ post }) => {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${post._id}`}>
            <img
              src={
                post.cover
                  ? process.env.REACT_APP_SERVER_URL ||
                    process.env.REACT_APP_DEV_SERVER_URL + '/' + post.cover
                  : noImage
              }
              alt="blog header"
            />
          </Link>
        </div>
        <div className="content">
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p className="info">
            <Link to="#" className="author">
              {post.author?.username}
            </Link>
            <time>
              {format(new Date(post.createdAt), 'MMM dd, yyyy HH:mm')}
            </time>
          </p>
          <p className="summary">{post.summary}</p>
        </div>
      </div>
    </>
  );
};

export default Post;

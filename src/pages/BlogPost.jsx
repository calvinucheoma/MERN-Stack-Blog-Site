import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import noImage from '../assets/no-image.png';
import { Ring } from 'react-awesome-spinners';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const BlogPost = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState(null);

  const userInfo = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/post/${id}`).then((response) =>
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      })
    );
  }, [id]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Ring />
        </div>
      ) : (
        <div className="post__page">
          <h1>{postInfo.title}</h1>
          <time>
            {format(new Date(postInfo.createdAt), 'MMM dd, yyyy HH:mm')}
          </time>
          <div className="author">by {postInfo.author.username}</div>

          {userInfo.id === postInfo.author._id && (
            <div className="edit__row">
              <Link to={`/edit/${postInfo._id}`} className="edit__btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit Post
              </Link>
            </div>
          )}
          <div className="image">
            <img
              src={
                postInfo.cover
                  ? process.env.REACT_APP_SERVER_URL + '/' + postInfo.cover
                  : noImage
              }
              alt="blog post cover"
            />
          </div>

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
          {/* Because our post content we are getting back is in html format including the tags so we have to convert them back so we can print html from a string */}
        </div>
      )}
    </>
  );
};

export default BlogPost;

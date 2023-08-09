import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { Ring } from 'react-awesome-spinners';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_DEV_SERVER_URL
      }/post`
    ).then((response) =>
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
    );
  }, []);

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
        posts.length > 0 &&
        posts.map((post, index) => <Post key={index} post={post} />)
      )}
    </>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../state/authSlice';

const Navbar = () => {
  const userInfo = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
  //     credentials: 'include',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         // Check if the response status is not OK (e.g., 401 Unauthorized)
  //         // Handle the error or redirect to login page
  //         return;
  //       }
  //       // Get the token from the response headers
  //       const token = response.headers.get('Authorization');
  //       if (!token) {
  //         // Token is missing in the response, handle the error or redirect to login page
  //         return;
  //       }
  //       const formattedToken = token.split(' ')[1];
  //       // Store the token in local storage or cookies (choose one method)
  //       localStorage.setItem('token', formattedToken); // Using local storage here; you can also use cookies
  //       // Now dispatch the loginUser action with the token
  //       dispatch(loginUser(formattedToken));
  //     })
  //     .catch((error) => {
  //       // Handle other errors, if any
  //     });
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
      credentials: 'include',
    }).then((response) => {
      // console.log(response);
      response.json().then((userInfo) => {
        // console.log(userInfo);
        dispatch(loginUser(userInfo));
      });
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      dispatch(logoutUser());
    });
  };

  return (
    <>
      <header>
        <Link to="/" className="logo">
          BLOGIFY
        </Link>
        <nav>
          {userInfo ? (
            <>
              {/* <span>Hello, {userInfo.username}</span> */}
              <Link to="/create">Create new post</Link>
              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;

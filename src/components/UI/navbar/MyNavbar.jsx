import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context/index';

const MyNavbar = () => {
  const {setIsAuth} = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <>
      <MyButton onClick={logout}>Logout</MyButton>
      <div className="navbar">
        <div className="navbar__links">
          <Link className="navbar__link" to="/about">About</Link>
          <Link className="navbar__link" to="/posts">Posts</Link >
        </div>
      </div>
    </>
  );
}

export default MyNavbar;

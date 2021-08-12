import React, {useState, useEffect} from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import MyNavbar from './components/UI/navbar/MyNavbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, []); 

  return (
    <>
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading
      }}>
        <BrowserRouter>
          <MyNavbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;

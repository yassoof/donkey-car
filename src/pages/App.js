import '../css/App.css';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import TestCases from './test-cases';
import LostPage from './lost-page';

function App() {

  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSideNav(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sideNavHandler = useCallback(() => {
    setShowSideNav(!showSideNav);
  }, [showSideNav]);


  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container">
      <NavBar showSNav={showSideNav} setShowSNav={sideNavHandler} />
      <SideNav showSNav={showSideNav} setShowSNav={sideNavHandler} />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/http://localhost:3000/donkey-car'} element={<Home />} />
        <Route path='/donkey-car' element={<Home />} />
        <Route path='/donkey-car/test-cases' element={<TestCases />} />
        <Route path='*' element={<LostPage />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import NavBar from './components/NavBar';
import SideNav from './components/SideNav';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import gif from './assets/DonkeyCarGif.gif';
import Loading from './components/Loading';

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

  const sideNavHandler = () => {
    setShowSideNav(!showSideNav);
  };

  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container">
      <NavBar showSNav={showSideNav} setShowSNav={sideNavHandler} />
      <SideNav showSNav={showSideNav} setShowSNav={sideNavHandler} />
      <h1 className='pageTitle' > Donkey Car Project </h1>
      <img className='gif' src={gif} alt="Donkey Car" />
    </div>
  );
}

export default App;

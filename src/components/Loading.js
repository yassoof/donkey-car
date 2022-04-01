import logo from '../svg/logo.svg';
import '../css/App.css';
import { useEffect, useState, useMemo, useRef } from 'react';

const Loading = () => {
  const loadingTextCycle = useMemo(() => ['Loading.', 'Loading..', 'Loading...'], []);
  const [loadingText, setLoadingText] = useState(loadingTextCycle[0]);
  const x = useRef(0);


  useEffect(() => {    
    const interval = setInterval(() => {      
      x.current = (x.current + 1) % 3;
      setLoadingText(loadingTextCycle[x.current]);
    }, 500);
    return () => clearInterval(interval);
  }, [loadingTextCycle]);

  return (
    <div className='loadingpane' >
      <img className='App-logo' src={logo} alt="loading..." />
      <h2 className='loadingText' > {loadingText} </h2>
    </div>
  )
}

export default Loading
import logo from '../logo.svg';
import '../App.css'
import { useEffect, useState } from 'react';

const Loading = () => {
  const [loadingText, setLoadingText] = useState('Loading...');
  const loadingTextCycle = ['Loading.', 'Loading..', 'Loading...'];
  let x = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(loadingTextCycle[++x % 3]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      <img className='App-logo' src={logo} alt="loading..." />
      <h2 className='loadingText' > {loadingText} </h2>
    </span>
  )
}

export default Loading
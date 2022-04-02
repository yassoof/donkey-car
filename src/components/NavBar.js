import './css/NavBar.css';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import CenterNav from './CenterNav';
import { useState, useEffect } from 'react';

const NavBar = (props) => {
    const [path, setPath] = useState(window.location.hash);
    let tempPath = '';

    const normalizePath = () => {
        tempPath = window.location.hash;
        if (tempPath.endsWith('/')) {
            tempPath = tempPath.slice(0, tempPath.length - 1);
            setPath(tempPath);
        }
        setPath(tempPath);
    }

    useEffect(() => {
        return () => {
            normalizePath();
        }
    })


    return (
        <div className='topnav' onLoad={() => setPath(true)} onClick={() => normalizePath()}>
            <LeftNav batonpass={props} path={path} />
            <CenterNav path={path} />
            <RightNav />
        </div>
    );
};

export default NavBar;
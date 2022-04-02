import './css/NavBar.css';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import CenterNav from './CenterNav';
import { useState } from 'react';

const NavBar = (props) => {
    const [path, setPath] = useState(window.location.pathname);
    let tempPath = '';

    const normalizePath = () => {
        tempPath = window.location.pathname;
        if (tempPath.endsWith('/')) {
            tempPath = tempPath.slice(0, tempPath.length-1);
        }
        setPath(tempPath);
    }

    return (
        <div className='topnav' onClick={()=> normalizePath()}>
            <LeftNav batonpass={props} path={path} />
            <CenterNav path={path} />
            <RightNav />
        </div>
    );
};

export default NavBar;
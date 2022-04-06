import './css/NavBar.css';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import CenterNav from './CenterNav';
import { useState } from 'react';

const NavBar = (props) => {
    const [path, setPath] = useState(window.location.hash);
    let tempPath = '';

    function pathHandler() {
        tempPath = window.location.hash;
        if (tempPath.endsWith('/'))
            tempPath = tempPath.slice(0, tempPath.length - 1);
        if (path !== tempPath)
            setPath(tempPath);
    }

    return (
        <div className='topnav' onLoad={() => pathHandler()} onClick={() => pathHandler()}>
            <LeftNav batonpass={props} path={path} />
            <CenterNav path={path} />
            <RightNav />
        </div>
    );
};

export default NavBar;
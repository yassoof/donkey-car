import './css/NavBar.css';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import CenterNav from './CenterNav';
import { useState } from 'react';

const NavBar = (props) => {
    const [path, setPath] = useState(window.location.pathname);

    return (
        <div className='topnav' onClick={()=> setPath(window.location.pathname)}>
            <LeftNav batonpass={props} path={path} />
            <CenterNav path={path} />
            <RightNav />
        </div>
    );
};

export default NavBar;
import './NavBar.css';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import CenterNav from './CenterNav';

const NavBar = (props) => {
    return (
        <div className='topnav'>
            <LeftNav batonpass={props}/>
            <CenterNav />
            <RightNav />
        </div>
    );
};

export default NavBar;
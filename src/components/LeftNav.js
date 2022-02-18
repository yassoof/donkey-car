import { FaBars } from 'react-icons/fa';
import logo from '../assets/DonkeyCarImage.png';

const LeftNav = (props) => {
  return (
    <span className='leftbar'>
      <a className='icon'
        style={props.batonpass.showSNav ? 
          { color: 'black', backgroundColor: '#ddd'} : 
          null}
        onClick={(e) => { props.batonpass.setShowSNav() }} >
        <FaBars />
      </a>
      <img className='navlogo' src={logo} alt='navbar logo' />
      <a className='active'> Home </a>
    </span>
  )
}

export default LeftNav;
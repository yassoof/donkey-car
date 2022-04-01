import CenterNav from "./CenterNav";
import "./css/SideNav.css";

const SideNav = (props) => {
  
  return (
    <div className='sidenav' style={props.showSNav ? 
      { minWidth: '10em', width: '18vw'} : 
      {width: '0px'}} >
        <button className='closebutton not-button nav-item' onClick={() => {props.setShowSNav()}} > &times; </button>
        <CenterNav />
    </div>
  )
}

export default SideNav
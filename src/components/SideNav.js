import CenterNav from "./CenterNav"
import "./SideNav.css"

const SideNav = (props) => {
  
  return (
    <div className='sidenav' style={props.showSNav ? 
      {minWidth: '158px', width: '18vw'} : 
      {width: '0'}} >
        <a className='closebutton' onClick={() => {props.setShowSNav()}} > &times;</a>
        <CenterNav />
    </div>
  )
}

export default SideNav
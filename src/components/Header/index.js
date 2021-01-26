import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions';



/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // const logout = () => {
  //    dispatch(logout())
  //  }
  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <div className="logo">Talk To</div>
          {
            !auth.authenticated ?
            <ul className="leftMenu">
                <li><NavLink to={'/login'}>Giriş</NavLink></li>
                <li><NavLink to={'/signup'}>Kayıt Ol</NavLink></li>
              </ul> : null
          }
              
           
        </div>
          <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
            
          </div>
        <ul className="menu">

            {
              auth.authenticated ?
              <li>
                <Link to={'#'} onClick={() => {
                  dispatch(logout(auth.userID))
                }}>Çıkış</Link>
            </li> : null
            }
          
            
             
        </ul>
    </header>
   )

 }

export default Header
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import Card from '../../components/Layout/UI/Card';
import { signin, isLoggedInUser } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';



/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

//  useEffect(() => {
//      if(!auth.authenticated){
//        dispatch(isLoggedInUser())
//      }
//    }, []);

  const userLogin = (e) =>{
    e.preventDefault();
    if(email == ""){
      alert("Lütfen Email adresinizi giriniz");
      return;
    }
    if(password == ""){
      alert("Lütfen Şifrenizi giriniz");
      return;
    }

    dispatch(signin({ email, password}));
  }
  if(auth.authenticated){
    return <Redirect to={'/'} />
  }
  return(
    <Layout>
   
      <div className="loginContainer">
        <Card>
        
          <form onSubmit={userLogin}>
          
            <input
          
            name="email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="Email"
            />
             <input
            name="password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Şifre"
            />

            <div>
              <button>Giriş</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
   )

 }

export default LoginPage
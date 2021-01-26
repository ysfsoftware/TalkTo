import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeSpeeches } from '../../actions';


const User = (props) =>{

    const {user, onClick} = props;

    return (
      <div onClick={() => onClick(user)} className="displayName">
                    <div className="displayPic">
                        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                        <span style={{fontWeight: 500}}>{user.userName}</span>
                        <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
                    </div>
                </div>
    );
  }

const HomePage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);
    let unsubscribe;



    useEffect(() => {

        unsubscribe = dispatch(getRealtimeUsers(auth.userID))
         .then(unsubscribe => {
            return unsubscribe;
          })
          .catch(error => {
            console.log(error);
          })
    
        
    
    
      }, []);
   
      useEffect(() => {
        return () => {
          //cleanup
          unsubscribe.then(f => f()).catch(error => console.log(error));
    
        }
      }, []);

      const initChat = (user) => {

        setChatStarted(true)
        setChatUser(`${user.userName}`)
        setUserUid(user.userID);
    
        console.log(user);
    
      
        dispatch(getRealtimeSpeeches({ konusma_sahibi: auth.userID, kimle_konusuyor: user.userID }));
      }
      
      const submitMessage = (e) => {

        const msgObj = {
          konusma_sahibi: auth.userID,
          kimle_konusuyor: userUid,
          message
        }
    
    
        if(message !== ""){
          dispatch(updateMessage(msgObj))
          .then(() => {
            setMessage('')
          });
        }
    
        //console.log(msgObj);
    
      }
  return (
    
     <Layout>


    <section className="container">
    <div className="listOfUsers">
    
    {
               user.users.length > 0 ?
               user.users.map(user => {
                 return (
                   <User 
                     onClick={initChat}
                     key={user.userID} 
                     user={user} 
                     />
                 );
               }) : null
             }
                
    </div>
    <div className="chatArea">
        <div className="chatHeader">
        {
              chatStarted ? chatUser : ''
            }
            </div>
        <div className="messageSections">
           {
                  chatStarted ? 
                  user.speeches.map(con =>
                    <div style={{ textAlign: con.konusma_sahibi == auth.userID ? 'right' : 'left' }}>
                    <p className="messageStyle" >{con.message}</p>
                  </div> )
                  : null
                }
                

        </div>
        {
              chatStarted ? 
              <div className="chatControls">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bir mesaj yaz"
                />
                <button onClick={submitMessage}>Gönder</button>
            </div> : null
            }
            
        </div>
</section>
</Layout>
  );
}

export default HomePage;
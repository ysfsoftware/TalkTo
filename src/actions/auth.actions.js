import  firebase from "firebase";
import { max } from "moment";
import { authConstanst } from "./constants";

var ust=99999999;
var alt=10000000;
let sayi=Math.random(); 
sayi=sayi*(ust-alt);
sayi=Math.floor(sayi)+alt;
export const signup = (user) => {

    return async (dispatch) => {

        const db = firebase.firestore();

        dispatch({type: `${authConstanst.USER_LOGIN}_REQUEST`});

        firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
            console.log(data);
            const currentUser = firebase.auth().currentUser;
            const userName = user.email.substring(0, user.email.indexOf('@'))+sayi;
            currentUser.updateProfile({
            
           })
           .then(()=>{
            db.collection('users')
            .doc(data.user.uid)
            .set({
                userName: userName,
                userID: data.user.uid,
                createdAt: new Date(),
                email: user.email,
                profilURL:"",
                seviye:"1",
                updatedAt: new Date(),
                isOnline: true
            })
            .then(()=>{
                const loggedInUser = {
                    userName: userName,
                    userID: data.user.uid,
                    email: user.email
                } 
                localStorage.setItem('user',JSON.stringify(loggedInUser));
                console.log('Kullanıcı kayıt olma işlemi başarılı...');
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: {user: loggedInUser}
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({ 
                type: `${authConstanst.USER_LOGIN}_FAILURE`, 
                payload: {error}
            });
            });
           });
           
    })
    .catch(error => {
        console.log(error);
    })

    }

}
export const signin = (user) => {
    return async (dispatch) => {

        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
        firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            console.log(data);

            const db = firebase.firestore();
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline: true
            })
            .then(() => {
                const name = data.user.userName;
    
                const loggedInUser = {
                    name,
                    userID: data.user.uid,
                    email: data.user.email
                }
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedInUser }
                });
            })
            .catch(error =>{
                console.log(error);
            })
          
       
        })
        .catch(error=>{
            console.log(error);
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error }
            })
        })
    }
}

export const isLoggedInUser = () => {
    return async (dispatch) => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user){
            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        }else{
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error: 'Lütfen yeniden deneyin' }
            });
        }


    }
}

export const logout = (userID) => {
    return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
    

        const db = firebase.firestore();
        db.collection('users')
        .doc(userID)
        .update({
            isOnline: false
        })
        .then(() => {

            firebase.auth()
            .signOut()
            .then(() => {
                //successfully
                localStorage.clear();
                dispatch({type: `${authConstanst.USER_LOGOUT}_SUCCESS`});
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } })
            })

        })
        .catch(error => {
            console.log(error);
        })

        


    }
}
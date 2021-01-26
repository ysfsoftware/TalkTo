import { userConstants } from "./constants";
import firebase  from 'firebase';


export const getRealtimeUsers = (userID) => {

    return async (dispatch) => {

        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

        const db = firebase.firestore();
        const unsubscribe = db.collection("users")
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().userID != userID){
                    users.push(doc.data());
                }
            });
            //console.log(users);

            dispatch({ 
                type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload: { users }
            });
    });
    return unsubscribe;
    }

}
export const updateMessage = (msgObj) => {
    return async dispatch => {

        const db = firebase.firestore();
        db.collection('speeches')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
        })
        .then((data) => {
            console.log(data)
            //success
            //  dispatch({
            //  type: userConstants.GET_REALTIME_MESSAGES,
            //  })


        })
        .catch(error => {
            console.log(error)
        });

    }
}
export const getRealtimeSpeeches = (user) => {
    return async dispatch => {

        const db = firebase.firestore();
        db.collection('speeches')
        .where('konusma_sahibi', 'in', [user.konusma_sahibi, user.kimle_konusuyor])
        .orderBy('createdAt','asc')
        .onSnapshot((querySnapshot) => {

            const speeches = [];

            querySnapshot.forEach(doc => {

                if(
                    (doc.data().konusma_sahibi == user.konusma_sahibi && doc.data().kimle_konusuyor == user.kimle_konusuyor)
                    || 
                    (doc.data().konusma_sahibi == user.kimle_konusuyor && doc.data().kimle_konusuyor == user.konusma_sahibi)
                ){
                    speeches.push(doc.data())
                }  
                  if(speeches.length > 0){
                    dispatch({
                        type: `${userConstants.GET_REALTIME_MESSAGES}`,
                         payload: { speeches }
                    })
                 }else{
                     dispatch({
                         type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                         payload: { speeches }
                     })
                 }
             
            });

            console.log(speeches);
        })


    }
}
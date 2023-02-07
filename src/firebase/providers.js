import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider=new GoogleAuthProvider();


export const singInWithGoogle=async()=>{
    try{
        const result = await signInWithPopup(firebaseAuth,googleProvider);
/*         const credentials = GoogleAuthProvider.credentialFromResult(result);
 */       /*  const user=result.user;
        console.log(user) */

        const {displayName,email,photoURL,uid}=result.user;

        return{
            ok:true,

            displayName,email,photoURL,uid
        };

    }catch(error){
        console.log(error)

        const errorMessage=error.message

        return{

            ok:false,
            errorMessage,
        };

    };
};



export const registerUserWithEmailPassword=async ({email,password,displayName})=>{

    try{
        //llegar a firefase
        console.log({email,password,displayName})
        const resp=await createUserWithEmailAndPassword(firebaseAuth,email,password);
        const {uid,photoURL}=resp.user;
        console.log(resp);
        // TODO:actualizar el displayname en firebase
        await updateProfile(firebaseAuth.currentUser,{displayName})

        return{
            ok:true,
            uid,photoURL,email,displayName
        }
    
    }catch(error){
        console.log(error)
        return {ok:false,errorMessage: error.message}
    }

}

export const loginWithEmailPassword=async ({email,password})=>{

    try{
        //call function for firebase library

        const resp=await signInWithEmailAndPassword(firebaseAuth,email,password);
        const {uid,photoURL,displayName}=resp.user;

        return{
            ok:true,
            uid,photoURL,displayName
        }

    }catch(error){
        console.log(error)
        return{ok:false,errorMessage: error.message}
    }


}
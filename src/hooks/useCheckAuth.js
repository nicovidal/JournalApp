import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNote } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
  
      //un observable donde esta atento a lo que pasa con muchas emisiones
      onAuthStateChanged(firebaseAuth, async (user) => {
        if(!user)return dispatch(logout());

        const {uid,email,displayName,photoURL}=user;
        dispatch(login({uid,email,displayName,photoURL}));
        dispatch(startLoadingNote());
  
      });
  
  
    }, []);

    return status;
        //say if the user are authenticated
       
    
}

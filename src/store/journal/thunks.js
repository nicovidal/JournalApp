import {collection, doc, setDoc} from 'firebase/firestore/lite'
import { firebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes} from './journalSlice';



export const startNewNote=()=>{

    return async(dispatch,getState)=>{


        dispatch(savingNewNote());

        

        const {uid}=getState().auth;

        const newNote={
            title:'',
            body:'',
            date:new Date().getTime(),
        }

        // va a ser la de usuario autenticado
        const  newDoc = doc(collection(firebaseDB,`${uid}/journal/notas`));

        /* const setDocResp= */await setDoc(newDoc,newNote);

        /* console.log({newDoc,setDocResp}) */
        newNote.id=newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNote =()=>{
    return async(dispatch,getState)=>{

        const {uid}=getState().auth;
        if(!uid)throw new Error('El usuario no existe')

        const notes=await loadNotes(uid);
        dispatch(setNotes(notes))
        
    }
}



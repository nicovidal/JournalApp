import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        messageSaved:'',
        notes:[],
        active:null,
    },
    reducers: {
        //lo que minimo se necesita en un crud
        savingNewNote:(state)=>{
            state.isSaving=true;
        },
        addNewEmptyNote:(state,action)=>{
            state.notes.push( action.payload );
            state.isSaving=false;
        },
        setActiveNote:(state,action)=>{
            state.active=action.payload;

        },
        setNotes:(state,action)=>{
            state.notes=action.payload;

        },
        setSaving:(state)=>{

        },
        updateNote:(state,action)=>{

        },
        deleteNodeByid:(state,action)=>{

        },
    }
});



export const {addNewEmptyNote ,setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNodeByid,savingNewNote}= journalSlice.actions;
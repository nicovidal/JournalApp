import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        uid:null,
        emails:null,
        displayName:null,
        photoURL:null,
        errorMessage:null,
    },
    reducers: {
       login:(state,action)=>{
            state.status='checking'
       },
       logout:(state,payload)=>{

       },
       //if user push the button login is for checking this phase
       checkingCredentials:(state)=>{
            state.status='checking'
       }
    }
});



export const { login,logout,checkingCredentials } = authSlice.actions;
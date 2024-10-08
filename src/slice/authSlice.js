import {createSlice} from '@reduxjs/toolkit'

// @TODO :- token logic to be peformed in the later version of the WEB
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ||  null 
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        clearUser(state){
            state.user = null,
            localStorage.removeItem('user')
        }
    }
})


export const {setUser,clearUser} = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        //ovdje logujemo usera
        logedUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('elUser', JSON.stringify(action.payload));
            localStorage.setItem('elToken', JSON.stringify(action.payload.token));
        },
        //rijesi bug 
        restoreUser: (state, action) => { //ima za zadatak da iznova puni state user
            state.user = action.payload;
        },
        //izloguj usera
        clearUser: (state, action) => {
            state.user = {};
            localStorage.removeItem('elUser');
            localStorage.removeItem('elToken');
        }
    }
})

export const {logedUser, restoreUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
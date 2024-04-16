import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: localStorage.getItem('isDark') === 'true' ? true : 
        localStorage.getItem('isDark') === 'false' ? false : 
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    reducers:{
        handleTheme: (state)=>{
            state.isDark = !state.isDark
            localStorage.setItem('isDark', String(state.isDark));

        }
    }

})

export const {handleTheme} = themeSlice.actions
export default themeSlice.reducer
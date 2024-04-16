import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    reducers:{
        handleTheme: (state)=>{
            state.isDark = !state.isDark
        }
    }

})

export const {handleTheme} = themeSlice.actions
export default themeSlice.reducer
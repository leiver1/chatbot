import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: true
    },
    reducers:{
        handleTheme: (state)=>{
            state.isDark = !state.isDark
        }
    }

})

export const {handleTheme} = themeSlice.actions
export default themeSlice.reducer
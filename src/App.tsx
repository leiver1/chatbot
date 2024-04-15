
import {  ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import ProtectedRoutes from './router/ProtectedRoutes'
import { Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import CssBaseline from "@mui/material/CssBaseline";
import {darkTheme, lightTheme} from './theme/themeConfig'
import { useSelector } from 'react-redux';
import ChatBot from './pages/ChatBot';
import Info from './pages/Info';
import Help from './pages/Help';
import type { RootState  } from './app/store'


const App  = () => {
  const isDark = useSelector((state: RootState)=> state.theme.isDark)
  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <CssBaseline/>

      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<ProtectedRoutes/>}>
            <Route  path="/" element={<Test/>} /> 
            <Route  path="/chat-bot" element={<ChatBot/>} /> 
            <Route  path="/info" element={<Info   />} /> 
            <Route  path="/help" element={<Help/>} /> 
        </Route>
      </Routes>
    
            </ThemeProvider>
    </>
  )
};

export default App 


import { createTheme, responsiveFontSizes } from "@mui/material";


let darkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary:{
            main: '#1E88E5'
        },
        secondary: {
            main: '#B0BEC5'
        },
        background: {
            default: '#212121',
            paper: '#333333'

        }
    },
    components:{
        MuiPaper:{
            defaultProps:{
                elevation: 2
            },
            styleOverrides:{
                root:{
                    borderRadius: 3,
                    padding: 14
                }
            }
        }
    }
})
let lightTheme = createTheme({
    palette:{
        mode: 'light',
        primary:{
            main: '#102dea'
        },
        secondary: {
            main: '#6C757D'
        },
        background: {
            default: '#F4F4F4',
            paper: '#FFFFFF'

        }
    },
    components:{
        MuiPaper:{
            defaultProps:{
                elevation: 1
            },
            styleOverrides:{
                root:{
                    borderRadius: 3,
                    padding: 14
                }
            }
        },
        MuiAppBar: {
            defaultProps: {
            //   color: 'primary'
            },
            styleOverrides: {
              root: {
                background: '#FFFFFF',
              }
            }
          },
    }
})

darkTheme = responsiveFontSizes(darkTheme)
lightTheme = responsiveFontSizes(lightTheme)

export  {darkTheme, lightTheme}
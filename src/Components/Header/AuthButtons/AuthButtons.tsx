import style from "./AuthButtons.module.scss"
import React from "react";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {Link} from "react-router-dom";

export const AuthButtons: React.FC = () => {

    const muiTheme = createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
        }
    })

    return <div className={style.wrapper}>
        <ThemeProvider theme={muiTheme}>
            <Link to={'/sign-in'}>
                <Button variant={'text'} className={style.button}>Sign In</Button>
            </Link>
            <Link to={'/sign-up'}>
                <Button variant={'outlined'} color={'success'} className={`${style.button} ${style.success}`}>Sign
                    Up</Button>
            </Link>
        </ThemeProvider>
    </div>
}
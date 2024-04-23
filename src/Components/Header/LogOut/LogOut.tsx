import React from "react";
import {Button} from "@mui/material";
import style from './LogOut.module.scss';
import {useAppDispatch} from "../../../hooks/hooks";
import {signOutUser} from "../../../store/signInSlice/signIn.slice";
import {useHistory} from "react-router-dom";

export const LogOut: React.FC = () => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const onClickHandler = () => {
        dispatch(signOutUser())
        history.push('/')
    }

    return <div className={style.logOut}>
        <Button size={'large'}
                variant={'outlined'}
                className={style.button}
                color={'error'}
                onClick={onClickHandler}
        >Log Out</Button>
    </div>
}
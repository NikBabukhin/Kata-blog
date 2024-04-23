import React from "react";
import style from './Header.module.scss';
import {AuthButtons} from "./AuthButtons/AuthButtons";
import {UsersProfile} from "./UsersProfile/UsersProfile";
import {CreateArticle} from "./CreateArticle/CreateArticle";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {LogOut} from "./LogOut/LogOut";

export const Header:React.FC = () => {
    const isAuthorized = useAppSelector(state=>state.singInSlice.isAuthorized)
    const user = useAppSelector(state=>state.singInSlice.user)

    return <header className={style.wrapper}>
        <div>
            <Link to={'/'}>
                <h6 className={style.header}>Real world Blog</h6>
            </Link>
        </div>
        <div className={style.menu}>
            {isAuthorized && <CreateArticle/>}
            {isAuthorized && <UsersProfile/>}
            {isAuthorized && <LogOut/>}
            {!isAuthorized && <AuthButtons/>}
        </div>
    </header>
}
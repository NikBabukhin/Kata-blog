import React from "react";
import style from "./UsersProfile.module.scss"
import {useAppSelector} from "../../../hooks/hooks";
import avatarPlaceholder from "../../../assets/image/avatar.png"
import {Link} from "react-router-dom";

export const UsersProfile: React.FC = () => {
    const user = useAppSelector(state => state.singInSlice.user)
    const shortUserName = user?.username.length < 13? user?.username : user?.username.slice(0,10)+'...'

    return <Link to={'/profile'}>
        <div className={style.wrapper}>
            <div title={user?.username}>{shortUserName}</div>
            <div>
                <img src={user?.image || avatarPlaceholder} alt={'No ava'} width={46} height={46}/>
            </div>
        </div>
    </Link>
}
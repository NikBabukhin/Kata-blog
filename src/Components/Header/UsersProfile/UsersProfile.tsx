import React from "react";
import style from "./UsersProfile.module.scss"
import {useAppSelector} from "../../../hooks/hooks";
import avatarPlaceholder from "../../../assets/image/avatar.png"
import {Link} from "react-router-dom";

export const UsersProfile: React.FC = () => {
    const user = useAppSelector(state => state.singInSlice.user)

    return <Link to={'/profile'}>
        <div className={style.wrapper}>
            <div>{user?.username}</div>
            <div>
                <img src={user?.image || avatarPlaceholder} alt={'No photo'} width={46} height={46}/>
            </div>
        </div>
    </Link>
}
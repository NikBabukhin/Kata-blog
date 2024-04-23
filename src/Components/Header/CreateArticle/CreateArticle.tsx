import React from "react";
import {Button} from "@mui/material";
import style from "./CreateArticle.module.scss"
import {Link} from "react-router-dom";

export const CreateArticle: React.FC = () => {
    return <div className={style.createButton}>
        <Link to={'/new-article'}>
            <Button variant={'outlined'} size={'small'} color={'success'}>Create Article</Button>
        </Link>
    </div>
}
import React, {useState} from "react";
import style from "./Author.module.scss";
import avatar from "../../../../../assets/image/avatar.png"
import {AuthorType} from "../../../../../store/articlesSlice/articles.slice";
import {format} from "date-fns";
import {Button} from "@mui/material";
import {PopupBody} from "../../ArticleHeader/PopupBody/PopupBody";
import {useAppSelector} from "../../../../../hooks/hooks";

type AuthorPropsType = {
    isShortContent: boolean,
    author: AuthorType,
    date?: string,
    edithPath?: string,
    navigateToEdit?: (editPath: string) => void,
    fillArticleFieldsBeforeEdit?: () => void,
    deleteCurrentArticle?: () => void,
}

export const Author: React.FC<AuthorPropsType> = ({
                                                      isShortContent,
                                                      author,
                                                      date,
                                                      edithPath,
                                                      navigateToEdit,
                                                      fillArticleFieldsBeforeEdit,
                                                      deleteCurrentArticle
                                                  }) => {
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const isAuth = useAppSelector(state => state.singInSlice.isAuthorized)
    const onClickEditHandler = () => {
        if (navigateToEdit && edithPath) {
            fillArticleFieldsBeforeEdit && fillArticleFieldsBeforeEdit()
            navigateToEdit(edithPath)
        }
    }

    return <div className={style.wrapper}>
        <div className={style.shortWrapper}>
            <div className={style.author}>
                <h6 className={style.name}>{author.username || <i>Unknown Author</i>}</h6>
                <span className={style.date}>{date ? format((new Date(date)).getTime(), "PP") :
                    <i>Unknown date</i>}</span>
            </div>
            <div className={style.avatar}>
                <img src={author.image || avatar}
                     width={46}
                     height={46}
                     className={style.avatarImage}
                     alt={'avatar'}
                />
            </div>
        </div>
        {!isShortContent && isAuth && <div className={style.editButtons}>
            <Button variant={'outlined'} color={'error'} size={'small'}
                    onClick={() => setOpenPopup(!openPopup)}>Delete</Button>
            <Button variant={'outlined'} color={'success'} size={'small'} onClick={onClickEditHandler}>Edit</Button>
        </div>}
        <PopupBody open={openPopup} setOpen={setOpenPopup} confirmMove={deleteCurrentArticle}/>
    </div>
}
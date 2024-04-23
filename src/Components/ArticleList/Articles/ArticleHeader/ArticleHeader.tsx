import React, {ReactNode, useState} from "react";
import style from "../Article/Article.module.scss";
import {CircularProgress, IconButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {TagsBlock} from "../../../TagsBlock/TagsBlock";
import {Link} from "react-router-dom";
import {ArticleType, changeCurrentArticle} from "../../../../store/articlesSlice/articles.slice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {favoriteArticle} from "../../../../store/articlePageSlice/articlePage.action";

type ArticleHeaderPropsType = {
    isShortContent: boolean,
    article: ArticleType
}

export const ArticleHeader: React.FC<ArticleHeaderPropsType> = ({isShortContent, article}) => {

    const [loadingLike, setLoadingLike] = useState<boolean>(false)
    const like = article.favorited
    const token = useAppSelector(state => state.singInSlice.authToken)
    const isAuthorized = useAppSelector(state => state.singInSlice.isAuthorized)
    const dispatch = useAppDispatch()

    const shortDescription = (description: string | undefined): string | ReactNode => {
        if (description) {
            return description.trim().length > 230 ? description.trim().slice(0, 230) + '...' : description
        } else {
            return <i>Article has no description...</i>
        }
    }

    const shortTitle = (title: string | undefined): string | ReactNode => {
        if (title) {
            return title.trim().length > 20 ? title.trim().slice(0, 20) + '...' : title
        } else {
            return <i>Article has no title...</i>
        }
    }

    const setLike = () => {
        setLoadingLike(true)
        dispatch(favoriteArticle({
            isFavorited: like,
            articleSlug: article.slug,
            token
        })).then(value => {
            //@ts-ignore
            dispatch(changeCurrentArticle(value.payload))
            setLoadingLike(false)
        }).catch(() => {
            setLoadingLike(false)
        })
    }

    const header = article.slug && isShortContent ?
        <Link to={`/articles/${article.slug}`}><h5
            className={`${style.header} ${article.slug && style.headerLink}`}>{shortTitle(article.title)}</h5></Link> :
        <h5 className={style.header}>{article.title || <i>Article has no title...</i>}</h5>

    return <>
        <div className={style.title}>
            {header}
            <div className={style.likeWrapper}>
                {loadingLike ? <CircularProgress size={36}/> : <>
                    <IconButton onClick={setLike} className={style.buttonWrapper} disabled={!isAuthorized}>
                        {like ?
                            <FavoriteIcon color={'error'} fontSize={'small'}/> :
                            <FavoriteBorderIcon fontSize={'small'}/>}
                    </IconButton>
                    <span className={style.countLike}>{article.favoritesCount || 0}</span>
                </>
                }
            </div>
        </div>
        <TagsBlock isShortContent={isShortContent} tags={article.tagList}/>
        <div className={style.text}>{isShortContent ? shortDescription(article.description) : (article.description ||
            <i>Article has no description...</i>)}
        </div>
    </>
}
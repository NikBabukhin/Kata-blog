import React, {useEffect} from "react";
import style from './ArticlePage.module.scss'
import {Article} from "../ArticleList/Articles/Article/Article";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchArticle} from "../../store/articlePageSlice/articlePage.action";
import {CircularProgress} from "@mui/material";

type ArticlePagePropsType = {
    articleSlug?: string,
}

export const ArticlePage: React.FC<ArticlePagePropsType> = ({articleSlug}) => {
    const article = useAppSelector(state => state.articlePageSlice.article)
    const loading = useAppSelector(state => state.articlePageSlice.isLoading)
    const error = useAppSelector(state=>state.articlePageSlice.isError)
    const errorText = useAppSelector(state=>state.articlePageSlice.errorText)
    const token = useAppSelector(state=>state.singInSlice.authToken)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (articleSlug) {
            dispatch(fetchArticle({articleSlug, token}))
        }
    }, [articleSlug])

    return <div className={style.wrapper}>
        {error? <span>{errorText}</span> : loading
            ? <CircularProgress/>
            : <Article
                isShortContent={false}
                article={article}
            />}
    </div>
}
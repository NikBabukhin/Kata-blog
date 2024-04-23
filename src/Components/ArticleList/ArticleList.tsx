import React, {useEffect} from "react";
import style from './ArticleList.module.scss'
import {Articles} from "./Articles/Articles";
import {PaginationBlock} from "./PaginationBlock/PaginationBlock";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {ArticleType, changeCurrentPage} from "../../store/articlesSlice/articles.slice";
import {fetchArticlesList} from "../../store/articlesSlice/articles.action";
import {CircularProgress} from "@mui/material";

export const ArticleList: React.FC = () => {
    const currentPage = useAppSelector<number>(state => state.articlesSlice.currentPage)
    const totalArticles = useAppSelector<number>(state => state.articlesSlice.totalArticles)
    const articles = useAppSelector<ArticleType[]>(state => state.articlesSlice.articles)
    const articlesPerPage = useAppSelector<number>(state => state.articlesSlice.articlesPerPage)
    const loading = useAppSelector(state => state.articlesSlice.isLoading)
    const error = useAppSelector(state => state.articlesSlice.isError)
    const errorText = useAppSelector(state => state.articlesSlice.error)
    const token = useAppSelector(state => state.singInSlice.authToken)
    const dispatch = useAppDispatch()

    const totalPages = Math.ceil(totalArticles / articlesPerPage)

    const changePage = (newPageNumber: number) => {
        dispatch(changeCurrentPage(newPageNumber))
    }

    useEffect(() => {
        dispatch(fetchArticlesList({currentPage, token}))
    }, [currentPage])

    useEffect(() => {
        dispatch(fetchArticlesList({currentPage, token}))
    }, [])

    return <div className={style.wrapper}>
        {error ? <span>{errorText}</span> : loading ?
            <CircularProgress/> :
            <>
                <Articles articles={articles}/>
                <PaginationBlock
                    currentPage={currentPage}
                    changePage={changePage}
                    totalPages={totalPages}
                />
            </>
        }
    </div>
}
import React from "react";
import style from "./Article.module.scss"
import {Author} from "./Author/Author";
import {ArticleHeader} from "../ArticleHeader/ArticleHeader";
import Markdown from "react-markdown";
import {ArticleType} from "../../../../store/articlesSlice/articles.slice";
import {useHistory} from "react-router-dom";
import {editArticleChangeParentArticle} from "../../../../store/editArticleSlice/editArticle.slice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {deleteArticle} from "../../../../store/articlePageSlice/articlePage.action";

type ArticlePropsType = {
    article: ArticleType
    isShortContent: boolean,
}

export const Article: React.FC<ArticlePropsType> = ({isShortContent, article}) => {
    const token = useAppSelector(state => state.singInSlice.authToken)
    const history = useHistory()
    const dispatch = useAppDispatch()
    const navigateToEdit = (path: string) => {
        history.push(path)
    }
    const fillArticleFieldsBeforeEdit = () => {
        const articleDataForEdit = {
            tags: article.tagList,
            article: {
                title: article.title,
                description: article.description,
                body: article.body,
                slug: article.slug,
            },
        }
        dispatch(editArticleChangeParentArticle(articleDataForEdit))
    }
    const deleteCurrentArticle = () => {
        dispatch(deleteArticle({articleSlug: article.slug, token})).then(response => {
            history.push('/articles')
        })
    }
    const path = `/articles/${article.slug}/edit`

    return <article className={`${style.wrapper} ${isShortContent && style.shortWrapper}`}>
        <div className={style.content}>
            <ArticleHeader
                isShortContent={isShortContent}
                article={article}
            />
        </div>
        <div className={style.author}>
            <Author
                isShortContent={isShortContent}
                author={article.author}
                date={article.createdAt}
                slug={article.slug}
                edithPath={path}
                navigateToEdit={navigateToEdit}
                fillArticleFieldsBeforeEdit={fillArticleFieldsBeforeEdit}
                deleteCurrentArticle={deleteCurrentArticle}
            />
        </div>
        {!isShortContent &&
            <div className={style.textBody}>
                {article.body ? <Markdown>{article.body}</Markdown> : <i>Article has no body</i>}
            </div>}
    </article>
}
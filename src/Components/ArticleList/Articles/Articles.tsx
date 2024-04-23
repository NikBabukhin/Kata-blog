import React from "react";
import style from './Articles.module.scss'
import {Article} from "./Article/Article";
import {ArticleType} from "../../../store/articlesSlice/articles.slice";

type ArticlesPropsType = {
    articles: ArticleType[]
}

export const Articles: React.FC<ArticlesPropsType> = ({ articles }) => {

    return articles.length?<div className={style.wrapper}>
        {articles.map(article=><Article
            key={article.slug}
            article={article}
            isShortContent={true}
        />)}
    </div> : <span>Has no articles</span>
}
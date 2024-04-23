import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchArticlesList} from "./articles.action";

export type AuthorType = {
    username: string,
    image: string,
    following: boolean,
}
export type ArticleType = {
    slug: string,
    title: string,
    description: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    tagList: string[],
    favorited: boolean,
    favoritesCount: number,
    author: AuthorType
}
export type ArticlesStateType = {
    isLoading: boolean,
    isError: boolean,
    error?: string,
    articles: ArticleType[],

    currentPage: number,
    totalArticles: number,
    articlesPerPage: number,
}

const initialState: ArticlesStateType = {
    isLoading: false,
    isError: false,
    articles: [],

    currentPage: 1,
    totalArticles: 0,
    articlesPerPage: 20,
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        changeCurrentArticle: (state, action: PayloadAction<ArticleType>) => {
            state.articles = state.articles.map(article => article.slug === action.payload.slug ? action.payload : article)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchArticlesList.pending, state => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(fetchArticlesList.rejected, state => {
            state.isLoading = false
            state.isError = true
            state.error = 'Something went wrong with server'
        })
        builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            delete state.error
            state.articles = action.payload.articles
            state.articlesPerPage = action.payload.articles.length
            state.totalArticles = action.payload.articlesCount
        })
    }
})

export const {changeCurrentPage, changeCurrentArticle} = articlesSlice.actions
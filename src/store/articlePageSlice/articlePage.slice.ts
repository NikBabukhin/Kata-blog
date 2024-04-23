import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ArticleType} from "../articlesSlice/articles.slice";
import {deleteArticle, favoriteArticle, fetchArticle} from "./articlePage.action";

type ArticlePageSliceInitialType = {
    article: ArticleType,
    isLoading: boolean,
    isError: boolean,
    errorText?: string,
}

const initialState:ArticlePageSliceInitialType = {
    article: {
        slug: '',
        title: '',
        description: '',
        body: '',
        createdAt: '',
        updatedAt: '',
        tagList: [],
        favorited: false,
        favoritesCount: 0,
        author: {
            username: '',
            image: '',
            following: false,
        }
    },
    isError: false,
    isLoading: false,
}

export const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchArticle.pending, state=>{
            state.isLoading = true
            state.isError = false
            delete state.errorText
        })
        builder.addCase(fetchArticle.rejected, state => {
            state.isLoading = false
            state.isError = true
            state.errorText = 'Problems with server'
        })
        builder.addCase(fetchArticle.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            delete state.errorText

            state.article = action.payload
        })

        builder.addCase(deleteArticle.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorText = 'Problems with server'
        })
        builder.addCase(deleteArticle.pending, state=>{
            state.isLoading = true
            state.isError = false
            delete state.errorText
        })
        builder.addCase(deleteArticle.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            delete state.errorText
        })
        builder.addCase(favoriteArticle.fulfilled, (state, action:PayloadAction<ArticleType>) => {
            state.article = action.payload
        })
    }
})
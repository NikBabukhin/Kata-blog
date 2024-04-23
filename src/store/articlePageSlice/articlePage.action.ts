import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";
import {ArticleType} from "../articlesSlice/articles.slice";

export type FetchArticleArgumentsType = {
    articleSlug: string,
    token?: string,
}

export type FavoritedArticle = {
    token?: string | null,
    isFavorited: boolean,
    articleSlug: string,
}

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async ({
                                                                                 articleSlug,
                                                                                 token
                                                                             }: FetchArticleArgumentsType) => {
    const options = {
        "Authorization": '',
    }
    if (token) {
        options.Authorization = `Token ${token}`
    }

    const response = await fetch(`${MAIN_URL}articles/${articleSlug}`, {headers: options}).then(res => res.json()).catch(err => {
        throw new Error(err)
    })
    return await response.article
})


export const deleteArticle = createAsyncThunk('articles/deleteArticle', async ({
                                                                                   articleSlug,
                                                                                   token
                                                                               }: FetchArticleArgumentsType) => {
    const options = {
        "Authorization": `Token ${token}`,
    }
    const response = await fetch(`${MAIN_URL}articles/${articleSlug}`, {
        method: 'DELETE',
        headers: options
    }).then(res => res.json()).catch(err => {
        throw new Error(err)
    })
    return await response
})

export const favoriteArticle = createAsyncThunk('articles/favoriteArticle', async ({
                                                                                       articleSlug,
                                                                                       isFavorited,
                                                                                       token
                                                                                   }: FavoritedArticle) => {
    try {
        const options = {
            "Authorization": `Token ${token}`,
        }
        const response = await fetch(`${MAIN_URL}articles/${articleSlug}/favorite`, {
            method: isFavorited ? 'DELETE' : 'POST',
            headers: options
        }).then(res => res.json()).catch(err => {
            throw new Error(err)
        })
        if (response.errors?.message) {
            throw new Error(response.errors.message)
        }
        return await response.article as ArticleType
    } catch (error: any) {
        throw new Error(error)
    }
})
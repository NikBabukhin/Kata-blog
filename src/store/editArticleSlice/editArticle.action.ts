import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";
import {ArticleType} from "../articlesSlice/articles.slice";

export type SendDataEditArticleType = {
    title: string,
    description: string,
    body: string,
    tagList: string[],
}

type FetchCreateNewArticleDataType = {
    article: SendDataEditArticleType,
    token?: string,
}

export type SendDataEditWithoutTagsArticleType = {
    title: string,
    description: string,
    body: string,
}

type FetchEditArticleDataType = {
    article: SendDataEditWithoutTagsArticleType,
    token?: string,
    slug: string,
}

export const fetchCreateNewArticle = createAsyncThunk('editArticleSlice/createNewArticle', async ({
                                                                                                      token,
                                                                                                      article,
                                                                                                  }: FetchCreateNewArticleDataType): Promise<ArticleType> => {
    try {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({article})
        }
        const response = await fetch(`${MAIN_URL}/articles`, options).then(res => res.json())
        if (response.errors) {
            const errors = []
            for (let key in response.errors) {
                errors.push(`${key} ${response.errors[key]}`)
            }
            throw new Error(JSON.stringify(response.errors))
        }
        return response.article
    } catch (error: any) {
        throw new Error(error.message)
    }
});

export const fetchEditArticle = createAsyncThunk('editArticleSlice/editArticle', async ({
                                                                                            article,
                                                                                            token,
                                                                                            slug
                                                                                        }: FetchEditArticleDataType) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({article})
        }
        const response = await fetch(`${MAIN_URL}/articles/${slug}`, options).then(res => res.json())
        if (response.errors) {
            const errors = []
            for (let key in response.errors) {
                errors.push(`${key} ${response.errors[key]}`)
            }
            throw new Error(JSON.stringify(response.errors))
        }
        return response.article
    } catch (error: any) {
        throw new Error(error.message)
    }
})
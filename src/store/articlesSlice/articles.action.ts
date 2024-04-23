import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";

export type FetchArticlesListParamsType = {
    currentPage: number,
    token?: string
}

export const fetchArticlesList = createAsyncThunk('articles/fetchArticles', async ({
                                                                                       currentPage,
                                                                                       token
                                                                                   }: FetchArticlesListParamsType) => {
    const options = {
        "Authorization": '',
    }
    if (token) {
        options.Authorization = `Token ${token}`
    }
    const response = await fetch(`${MAIN_URL}articles?offset=${currentPage}`, {headers: options}).then(res => res.json()).catch(err => {
        throw new Error(err)
    })
    return await response
})
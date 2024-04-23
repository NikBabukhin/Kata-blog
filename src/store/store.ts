import { configureStore } from '@reduxjs/toolkit'
import {articlesSlice} from "./articlesSlice/articles.slice";
import {articlePageSlice} from "./articlePageSlice/articlePage.slice";
import {signUpSlice} from "./signUpSlice/signUp.slice";
import {signInSlice} from "./signInSlice/signIn.slice";
import {profilePageSlice} from "./profilePage/profilePage.slice";
import {editArticleSlice} from "./editArticleSlice/editArticle.slice";

export const store = configureStore({
    reducer: {
        articlesSlice: articlesSlice.reducer,
        articlePageSlice: articlePageSlice.reducer,
        singUpSlice: signUpSlice.reducer,
        singInSlice: signInSlice.reducer,
        profilePageSlice: profilePageSlice.reducer,
        editArticleSlice: editArticleSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
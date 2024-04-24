import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCreateNewArticle, fetchEditArticle} from "./editArticle.action";

export type ChangeTagNamePayloadType = {
    index: number,
    value: string,
}
export type EditArticleAlertType = {
    message: string,
    error: boolean,
    isShow: boolean
}
export type NewArticleType = {
    title: string,
    description: string,
    body: string,
    slug?: string,
}

export type PayloadActionTypeFromArticlePage = {
    tags: string[],
    article: NewArticleType
}

type EditArticleStateType = {
    tags: string[],
    alert: EditArticleAlertType,
    loading: boolean,
    article: NewArticleType,
}

const initialState: EditArticleStateType = {
    tags: [],
    alert: {
        isShow: false,
        error: false,
        message: '',
    },
    loading: false,
    article: {
        title: '',
        description: '',
        body: '',
    }
}

export const editArticleSlice = createSlice({
    name: 'editArticleSlice',
    initialState,
    reducers: {
        editArticleAddNewTag: state => {
            state.tags = [...state.tags, '']
        },
        editArticleDeleteTag: (state, action: PayloadAction<number>) => {
            state.tags.splice(action.payload, 1)
        },
        editArticleChangeTag: (state, action: PayloadAction<ChangeTagNamePayloadType>) => {
            state.tags[action.payload.index] = action.payload.value
        },
        editArticleChangeParentArticle: (state, action: PayloadAction<PayloadActionTypeFromArticlePage>) => {
            state.tags = action.payload.tags
            state.article = action.payload.article
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCreateNewArticle.pending, state => {
            state.loading = true;
            state.alert.isShow = false
            state.alert.error = false
            state.alert.message = ''
        })
        builder.addCase(fetchCreateNewArticle.rejected, (state, action) => {
            state.loading = false
            state.alert.isShow = true
            state.alert.error = true
            state.alert.message = action.error.message || 'Unknown error'
        })
        builder.addCase(fetchCreateNewArticle.fulfilled, state => {
            state.article = initialState.article
            state.tags = initialState.tags
            state.loading = false
            state.alert.isShow = true
            state.alert.error = false
            state.alert.message = ''
        })
        builder.addCase(fetchEditArticle.pending, state => {
            state.loading = true;
            state.alert.isShow = false
            state.alert.error = false
            state.alert.message = ''
        })
        builder.addCase(fetchEditArticle.rejected, (state, action)=>{
            state.loading = false
            state.alert.isShow = true
            state.alert.error = true
            state.alert.message = action.error.message || 'Unknown error'
        })
        builder.addCase(fetchEditArticle.fulfilled, state=>{
            state.article = initialState.article
            state.tags = initialState.tags
            state.loading = false
            state.alert.isShow = true
            state.alert.error = false
            state.alert.message = ''
        })
    }
})

export const {
    editArticleAddNewTag, editArticleDeleteTag,
    editArticleChangeTag, editArticleChangeParentArticle
} = editArticleSlice.actions
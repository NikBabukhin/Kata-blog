import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchEditProfile} from "./profilePage.action";

export type ProfilePageErrorType = {
    isError: boolean,
    message: string,
    isShow: boolean,
}

type ProfilePageStateType = {
    isLoading: boolean,
    alert: ProfilePageErrorType,
}

const initialState: ProfilePageStateType = {
    isLoading: false,
    alert: {
        isError: false,
        message: '',
        isShow: false,
    },
}

export const profilePageSlice = createSlice({
    name: 'userPage',
    initialState,
    reducers: {
        changeShowAlertProfilePage: (state, action: PayloadAction<boolean>) => {
            state.alert.isShow = action.payload
        },
        clearAlertMessageProfilePage: state => {
            state.alert.isError = false
            state.alert.message = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchEditProfile.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchEditProfile.rejected, (state, action) => {
            state.isLoading = false
            state.alert = {
                isError: true,
                message: action.error.message || 'Unknown error when edit profile',
                isShow: true,
            }
        })
        builder.addCase(fetchEditProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.alert = {
                isError: false,
                message: 'Profile successfully update',
                isShow: true,
            }
        })
    }
})

export const {changeShowAlertProfilePage, clearAlertMessageProfilePage} = profilePageSlice.actions
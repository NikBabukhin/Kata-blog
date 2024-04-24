import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUserInfo, signInSubmitForm} from "./signIn.action";

type SignInSliceErrorStateType = {
    isShow: boolean,
    error: boolean,
    message: string,
}
export type CurrentSignUser = {
    email: string,
    token: string,
    username: string,
    bio?: string,
    image?: string | null,
}

type SignInSliceStateType = {
    isLoading: boolean,
    alert: SignInSliceErrorStateType,
    user: CurrentSignUser,
    isAuthorized: boolean,
    authToken?: string,
}

const initialState: SignInSliceStateType = {
    isLoading: false,
    alert: {
        isShow: false,
        error: false,
        message: '',
    },
    user: {
        email: '',
        token: '',
        username: '',
    },
    isAuthorized: false,
}

export const signInSlice = createSlice({
    name: 'signInSlice',
    initialState,
    reducers: {
        hideAlertSignIn: state => {
            state.alert.error = false
            state.alert.message = ''
            state.alert.isShow = false
        },
        changeAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload
        },
        changeAuthToken: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload
        },
        changeCurrentUser: (state, action: PayloadAction<{ user: CurrentSignUser }>) => {
            state.user = action.payload.user
            action.payload.user?.token && localStorage.setItem('token', JSON.stringify(action.payload.user.token))
        },
        signOutUser: state => {
            state.isAuthorized = false
            state.authToken = ''
            state.user.email = ''
            state.user.image = ''
            state.user.username = ''
            state.user.token = ''

            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(signInSubmitForm.pending, state => {
            state.isLoading = true
            state.alert.error = false
            state.alert.message = ''
            state.isAuthorized = false
        })
        builder.addCase(signInSubmitForm.rejected, (state, action) => {
            state.isLoading = false
            state.alert.error = true
            state.alert.message = action.error?.message || 'Unsuccessful'
            state.alert.isShow = true

            state.isAuthorized = false
        })
        builder.addCase(signInSubmitForm.fulfilled, (state, action: PayloadAction<{ user: CurrentSignUser }>) => {
            state.isLoading = false
            state.alert.error = false
            state.alert.message = 'Login successful'
            state.alert.isShow = true

            state.user = action.payload.user
            state.isAuthorized = true

            const token = action.payload.user?.token
            state.authToken = token
            token && localStorage.setItem('token', JSON.stringify(token))
        })
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.isAuthorized = false
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<{ user: CurrentSignUser }>) => {
            state.isLoading = false
            state.alert.error = false

            state.user = action.payload.user
            state.isAuthorized = true

            const token = action.payload.user?.token
            state.authToken = token
            token && localStorage.setItem('token', JSON.stringify(token))
        })
    }
})

export const {hideAlertSignIn, changeAuthorized, changeAuthToken, signOutUser, changeCurrentUser} = signInSlice.actions
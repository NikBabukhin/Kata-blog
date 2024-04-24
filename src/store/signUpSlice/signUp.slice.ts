import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signUpSubmitForm} from "./signUp.action";

export type FieldsType = {
    value: string,
    error: boolean,
}

type SignUpSliceType = {
    name: FieldsType,
    email: FieldsType,
    password: FieldsType,
    repeatPassword: FieldsType,
    personalInformation: boolean,
    loading: boolean,
    alert: {
        isShow: boolean,
        error: boolean,
        message: string,
    },
    redirectToHome: boolean,
}

const initialState: SignUpSliceType = {
    name: {
        value: '',
        error: false,
    },
    email: {
        value: '',
        error: false,
    },
    password: {
        value: '',
        error: false,
    },
    repeatPassword: {
        value: '',
        error: false,
    },
    personalInformation: false,
    loading: false,
    alert: {
        isShow: false,
        error: false,
        message: '',
    },
    redirectToHome: false,
}

export const signUpSlice = createSlice({
    name: 'sinUpSlice',
    initialState,
    reducers: {
        changePersonalAccept: (state, action: PayloadAction<boolean>) => {
            state.personalInformation = action.payload
        },
        hideAlertSignUp: state => {
            state.alert.error = false
            state.alert.message = ''
            state.alert.isShow = false
        }
    },

    extraReducers: builder => {
        builder.addCase(signUpSubmitForm.pending, state => {
            state.loading = true
        })
        builder.addCase(signUpSubmitForm.rejected, (state, action) => {
            state.loading = false
            state.alert.error = true
            state.alert.message = 'Unsuccessful'
            state.alert.isShow = true
        })
        builder.addCase(signUpSubmitForm.fulfilled, (state, action) => {
            state.loading = false
            state.alert.error = false
            state.alert.message = 'Registration is successful'
            state.alert.isShow = true

            const token = action.payload.user?.token
            token && localStorage.setItem('token', JSON.stringify(token))
        })
    }
})

export const {
    hideAlertSignUp,
    changePersonalAccept,
} = signUpSlice.actions
import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";

export type SignInDataType = {
    email: string,
    password: string,
}

export const signInSubmitForm = createAsyncThunk('signInSlice/submitForm', async (dataSignInData: SignInDataType, { rejectWithValue }) => {
    try {
        const data = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: dataSignInData})
        }
        const response = await fetch(`${MAIN_URL}/users/login`, data).then(res => res.json())
        if (response.errors) {
            const errors = []
            for (let key in response.errors) {
                errors.push(`${key} ${response.errors[key]}`)
            }
            throw new Error(errors.join('&'))
        }
        return response
    } catch (error:any) {
        throw new Error(error.message)
    }
})

export const fetchUserInfo = createAsyncThunk('signInSlice/getCurrentUser', async (userToken:string)=>{
    try {
        const headers = {
            "Authorization": `Token ${userToken}`,
        }
        const response = await fetch(`${MAIN_URL}/user`, {headers}).then(res=>res.json())
        if (response.errors) {
            throw new Error(response.errors.message)
        }
        return response
    } catch (error:any) {
        throw new Error(error)
    }
})
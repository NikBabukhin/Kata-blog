import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";

export type SignUpData = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
}

export type CorrectSignUpDataType = {
    username: string,
    email: string,
    password: string,
}

export const signUpSubmitForm = createAsyncThunk('signUpSlice/submitForm', async(dataSignUpData:CorrectSignUpDataType, { rejectWithValue })=>{
    try {
        const data = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: dataSignUpData})
        }
        const response = await fetch(`${MAIN_URL}/users`, data).then(res => res.json())
        if (response.errors) {
            const errors = []
            for (let key in response.errors) {
                errors.push(`${key} ${response.errors[key]}`)
            }
            throw new Error(JSON.stringify(response.errors))
        }
        return response
    } catch (error:any) {
        throw new Error(error.message)
    }
})
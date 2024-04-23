import {createAsyncThunk} from "@reduxjs/toolkit";
import {MAIN_URL} from "../GLOBAL_VARIABLES";

export type EditUserFormType = {
    username: string,
    email: string,
    password?: string,
    image?: string | null,
}

type FetchEditProfileParamsType = {
    profileData:EditUserFormType,
    token?: string,
}

export const fetchEditProfile = createAsyncThunk('profilePage/submitForm', async ({profileData, token}:FetchEditProfileParamsType) => {
    try {
        const data = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({user:profileData})
        }
        const response = await fetch(`${MAIN_URL}/user`, data).then(res => res.json())
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
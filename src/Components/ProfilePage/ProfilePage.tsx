import React, {useEffect} from "react";
import style from './ProfilePage.module.scss';
import {Alert, Button, CircularProgress, FormControl, TextField} from "@mui/material";
import {emailRegexp} from "../AuthPage/SignUp/SignUp";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {EditUserFormType, fetchEditProfile} from "../../store/profilePage/profilePage.action";
import {changeCurrentUser} from "../../store/signInSlice/signIn.slice";
import {changeShowAlertProfilePage, clearAlertMessageProfilePage} from "../../store/profilePage/profilePage.slice";

export const urlRegexp = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

export const ProfilePage: React.FC = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector(state => state.singInSlice.user)
    const alert = useAppSelector(state => state.profilePageSlice.alert)
    const loading = useAppSelector(state => state.profilePageSlice.isLoading)
    const token = useAppSelector(state => state.singInSlice.authToken)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<EditUserFormType>({
        defaultValues: {
            username: currentUser?.username,
            email: currentUser?.email,
            image: currentUser?.image || '',
        }
    })

    const onSubmit = (userInfo: EditUserFormType) => {
        const profileData: EditUserFormType = {
            username: userInfo.username.toLowerCase().trim(),
            email: userInfo.email.toLowerCase().trim(),
            image: userInfo.image?.trim() || null,
        }
        if (userInfo.password) {
            profileData.password = userInfo.password
        }
        dispatch(fetchEditProfile({profileData, token})).then(action => {
            dispatch(changeCurrentUser(action.payload))
        })
    }

    useEffect(() => {
        if (alert.isShow) {
            setTimeout(() => {
                dispatch(changeShowAlertProfilePage(false))
                dispatch(clearAlertMessageProfilePage())
                history.push('/')
            }, 1000)
        }
    }, [alert])

    return <div className={style.wrapper}>
        {alert.isShow && <div className={style.alert}>
            <Alert severity={alert.isError ? "error" : "success"} variant="filled">{alert.message}</Alert>
        </div>}
        {loading ? <CircularProgress/> : <>
            <h5 className={style.header}>Edit Profile</h5>
            <FormControl className={style.form}>
                <span className={style.inputName}>Username</span>
                <TextField
                    fullWidth
                    id="user-name-profile"
                    variant="outlined"
                    placeholder={'Username'}
                    helperText={errors.username?.message || ' '}
                    error={!!errors.username?.message}
                    {...register("username", {
                        required: 'Username is required!',
                        minLength: {
                            value: 3,
                            message: 'Username length must more 3 characters.'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Username length must less 20 characters.'
                        },
                    })}
                />

                <span className={style.inputName}>Email address</span>
                <TextField
                    fullWidth
                    id="email-address-profile"
                    variant="outlined"
                    placeholder={'Email address'}
                    helperText={errors.email?.message || ' '}
                    error={!!errors.email?.message}
                    {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: emailRegexp,
                            message: 'Email must be correct email'
                        },
                    })}
                />

                <span className={style.inputName}>Password</span>
                <TextField
                    fullWidth
                    id="new-password-profile"
                    variant="outlined"
                    placeholder={'New password'}
                    helperText={errors.password?.message || ' '}
                    error={!!errors.password?.message}
                    type={'password'}
                    {...register("password", {
                        minLength: {
                            value: 6,
                            message: 'Your password needs to be at least 6 characters.'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Your password must be a maximum of 40 characters.'
                        },
                    })}
                />

                <span className={style.inputName}>Avatar image (url)</span>
                <TextField
                    fullWidth
                    id="image-profile"
                    variant="outlined"
                    placeholder={'Avatar image'}
                    helperText={errors.image?.message || ' '}
                    error={!!errors.image?.message}
                    {...register("image", {
                        pattern: {
                            value: urlRegexp,
                            message: 'Avatar must be correct url'
                        },
                    })}
                />

                <Button fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                >
                    <span>Save</span>
                </Button>

            </FormControl>
        </>}
    </div>
}
import React, {useEffect} from "react";
import style from '../AuthPage.module.scss';
import {Alert, Button, CircularProgress, FormControl, TextField} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignInDataType, signInSubmitForm} from "../../../store/signInSlice/signIn.action";
import {emailRegexp} from "../SignUp/SignUp";
import {hideAlertSignIn} from "../../../store/signInSlice/signIn.slice";


export const SignIn: React.FC = () => {
    const loading = useAppSelector(state => state.singInSlice.isLoading)
    const alert = useAppSelector(state => state.singInSlice.alert)

    const history = useHistory()
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<SignInDataType>()

    const onSubmit: SubmitHandler<SignInDataType> = (data) => {
        const correctData: SignInDataType = {
            email: data.email.trim().toLowerCase(),
            password: data.password,
        }
        dispatch(signInSubmitForm(correctData))
    }

    useEffect(() => {
        if (alert.isShow && !alert.error) {
            setTimeout(() => {
                dispatch(hideAlertSignIn())
                history.push('/')
            }, 800)
        } else if (alert.isShow && alert.error) {
            setTimeout(() => {
                dispatch(hideAlertSignIn())
            }, 1200)
        }
    }, [alert])


    return <div className={style.wrapper}>
        {alert.isShow && <div className={style.alert}>
            <Alert severity={alert.error ? "error" : "success"} variant="filled">{alert.message}</Alert>
        </div>}
        {loading ? <CircularProgress/> : <>
            <h5 className={style.header}>Sign In</h5>
            <FormControl className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <span className={style.inputName}>Email address</span>
                <TextField
                    fullWidth
                    id="email-address"
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
                    id="password"
                    variant="outlined"
                    placeholder={'Password'}
                    helperText={errors.password?.message || ' '}
                    error={!!errors.password?.message}
                    type={'password'}
                    {...register("password", {
                        required: 'Password is required!',
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
            </FormControl>
            <div className={style.button}>
                <Button fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                >
                    <span>Login</span>
                </Button>
                <span className={style.signIn}>Dont have an account?</span>
                <Link to={'/sign-up'}> Sign Up</Link>
                <span className={style.signIn}>.</span>
            </div>
        </>}
    </div>
}
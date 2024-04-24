import React, {useEffect} from "react";
import style from "../AuthPage.module.scss"
import {Alert, Button, Checkbox, CircularProgress, FormControl, TextField} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {CorrectSignUpDataType, SignUpData, signUpSubmitForm} from "../../../store/signUpSlice/signUp.action";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {changePersonalAccept, hideAlertSignUp} from "../../../store/signUpSlice/signUp.slice";
import {changeAuthorized, changeAuthToken, changeCurrentUser} from "../../../store/signInSlice/signIn.slice";

export const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const SignUp: React.FC = () => {

    const personalInformation = useAppSelector(state => state.singUpSlice.personalInformation)
    const loading = useAppSelector(state => state.singUpSlice.loading)
    const alert = useAppSelector(state => state.singUpSlice.alert)

    const history = useHistory()
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setError,
    } = useForm<SignUpData>()

    const onSubmit: SubmitHandler<SignUpData> = (data) => {
        const correctData: CorrectSignUpDataType = {
            username: data.username.trim().toLowerCase(),
            email: data.email.trim().toLowerCase(),
            password: data.password,
        }
        dispatch(signUpSubmitForm(correctData)).then((action: any) => {
            if (action.payload?.user?.token) {
                dispatch(changeCurrentUser(action.payload))
                dispatch(changeAuthToken(action.payload.user?.token))
                dispatch(changeAuthorized(action.payload.user?.token))
            }
            if (action.error?.message) {
                const errors = JSON.parse(action.error.message)
                for (let key in errors) {
                    // @ts-ignore
                    setError(key, {
                        type: 'server',
                        message: `${key} ${errors[key]}`
                    })
                }
            }
        })
    }

    useEffect(() => {
        if (alert.isShow && !alert.error) {
            setTimeout(() => {
                dispatch(hideAlertSignUp())
                history.push('/')
            }, 800)
        } else if (alert.isShow && alert.error) {
            setTimeout(() => {
                dispatch(hideAlertSignUp())
            }, 1200)
        }
    }, [alert])

    return <div className={style.wrapper}>
        {alert.isShow && <div className={style.alert}>
            <Alert severity={alert.error ? "error" : "success"} variant="filled">{alert.message}</Alert>
        </div>}
        {loading ? <CircularProgress/> : <>
            <h5 className={style.header}>Create new account</h5>
            <FormControl className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <span className={style.inputName}>Username</span>
                <TextField
                    fullWidth
                    id="user-name"
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
                    id="email-address"
                    variant="outlined"
                    placeholder={'Email address'}
                    helperText={errors.email?.message || ' '}
                    error={!!errors.email?.message}
                    {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: emailRegexp,
                            message: 'Email must be correct emailю'
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

                <span className={style.inputName}>Repeat password</span>
                <TextField
                    fullWidth
                    id="repeat-password"
                    variant="outlined"
                    placeholder={'Password'}
                    helperText={errors.repeatPassword?.message || ' '}
                    error={!!errors.repeatPassword?.message}
                    type={'password'}
                    {...register("repeatPassword", {
                        required: 'Password is required!',
                        minLength: {
                            value: 6,
                            message: 'Your password needs to be at least 6 characters.'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Your password must be a maximum of 40 characters.'
                        },
                        validate: (value) => {
                            if (watch('password') !== value) {
                                return 'Passwords must match'
                            }
                        }
                    })}
                />
            </FormControl>
            <div className={style.personal}>
                <Checkbox aria-label={'personal-info'}
                          checked={personalInformation}
                          onChange={event => dispatch(changePersonalAccept(event.currentTarget.checked))}
                />
                <span>I agree to the processing of my personal information</span>
            </div>
            <div className={style.button}>
                <Button fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        disabled={!(personalInformation && !alert.error)}
                >
                    <span>Create</span>
                </Button>
                <span className={style.signIn}>Already have an account?</span>
                <Link to={'/sign-in'}> Sign In</Link>
                <span className={style.signIn}>.</span>
            </div>
        </>}
    </div>

}
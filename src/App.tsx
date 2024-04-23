import React, {useEffect, useState} from 'react';
import './App.scss';
import {Header} from "./Components/Header/Header";
import {ArticleList} from "./Components/ArticleList/ArticleList";
import {
    BrowserRouter,
    Redirect,
    Route,
} from 'react-router-dom';
import {ArticlePage} from "./Components/ArticlePage/ArticlePage";
import {SignUp} from "./Components/AuthPage/SignUp/SignUp";
import {SignIn} from "./Components/AuthPage/SignIn/SignIn";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {fetchUserInfo} from "./store/signInSlice/signIn.action";
import {ProfilePage} from "./Components/ProfilePage/ProfilePage";
import {EditArticlePage} from "./Components/EditArticlePage/EditArticlePage";
import {CircularProgress} from "@mui/material";
import {changeAuthorized} from "./store/signInSlice/signIn.slice";

export const App: React.FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.singInSlice.isAuthorized)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(changeAuthorized(true))
            dispatch(fetchUserInfo(JSON.parse(token))).then(res => setLoading(false))
                .catch(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                {loading ? <CircularProgress/> :
                    <>
                        <Route path={'/'} component={ArticleList} exact/>
                        <Route path={'/articles'} component={ArticleList} exact/>
                        <Route path={'/articles/:slug/'}
                               render={({match}) => <ArticlePage articleSlug={match.params.slug}/>} exact/>
                        <Route path={'/sign-up'} component={SignUp} exact/>
                        <Route path={'/sign-in'} component={SignIn} exact/>
                        <Route path={'/profile'} component={ProfilePage} exact/>
                        <Route path={'/new-article'} render={() => {
                            return !isAuth ?
                                <Redirect to={"/sign-in"}/> :
                                <EditArticlePage header={'Create new article'} isEdit={false}/>
                        }} exact/>
                        <Route path={'/articles/:slug/edit'} render={() => {
                            return !isAuth ?
                                <Redirect to={"/sign-in"}/> :
                                <EditArticlePage
                                    header={'Edit article'}
                                    isEdit={true}
                                />
                        }} exact/>
                    </>
                }
            </div>

        </BrowserRouter>
    );
}
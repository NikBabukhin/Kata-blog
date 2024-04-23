import React from "react";
import style from "./EditArticlePage.module.scss";
import {Button, CircularProgress, createTheme, TextField, ThemeProvider} from "@mui/material";
import {TagsForm} from "./TagsForm/TagsForm";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {
    editArticleChangeTag,
    editArticleDeleteTag,
    editArticleAddNewTag
} from "../../store/editArticleSlice/editArticle.slice";
import {SubmitHandler, useForm} from "react-hook-form";
import {fetchCreateNewArticle, SendDataEditArticleType} from "../../store/editArticleSlice/editArticle.action";
import {useHistory} from "react-router-dom";

type ArticleChangedPagePropsType = {
    header: string,
    isEdit: boolean,
}

export const EditArticlePage: React.FC<ArticleChangedPagePropsType> = ({header, isEdit}) => {
    const currentArticle = useAppSelector(state => state.editArticleSlice.article)
    const tags = useAppSelector(state => state.editArticleSlice.tags)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SendDataEditArticleType>({
        defaultValues: ({...currentArticle})
    })
    const history = useHistory()
    const token = useAppSelector(state => state.singInSlice.authToken)
    const loading = useAppSelector(state => state.editArticleSlice.loading)

    const dispatch = useAppDispatch()

    const onChangeValueTags = (index: number, value: string) => {
        dispatch(editArticleChangeTag({index, value}))
    }
    const removeItemFromTags = (tagsIndex: number) => {
        dispatch(editArticleDeleteTag(tagsIndex))
    }
    const addNewTag = () => {
        dispatch(editArticleAddNewTag())
    }

    const onSubmit: SubmitHandler<SendDataEditArticleType> = (data) => {
        data.tagList = tags
        dispatch(fetchCreateNewArticle({token, article: data}))
            .then((res: any) => {
                if (res.payload?.slug) {
                    history.push(`/articles/${res.payload?.slug}`)
                }
            })
    }


    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        padding: '8px 40px',
                    }
                }
            }
        }
    })

    return <ThemeProvider theme={theme}>
        <div className={style.wrapper}>
            {loading ? <CircularProgress/> :
                <>
                    <h5 className={style.header}>{header}</h5>
                    <div>
                        <span className={style.spanInput}>Title</span>
                        <TextField
                            id={'change-page-title'}
                            fullWidth
                            placeholder={'Title'}
                            variant={'outlined'}
                            helperText={errors.title?.message || ' '}
                            error={!!errors.title?.message}
                            {...register("title", {
                                required: 'Title is required!',
                            })}
                        />
                    </div>

                    <div>
                        <span className={style.spanInput}>Short description</span>
                        <TextField
                            id={'change-page-description'}
                            fullWidth
                            placeholder={'Description'}
                            variant={'outlined'}
                            helperText={errors.description?.message || ' '}
                            error={!!errors.description?.message}
                            {...register("description", {
                                required: 'Short description is required!',
                            })}
                        />
                    </div>

                    <div>
                        <span className={style.spanInput}>Text</span>
                        <TextField
                            id={'change-page-text'}
                            fullWidth
                            multiline
                            rows={6}
                            placeholder={'Text'}
                            variant={'outlined'}
                            helperText={errors.body?.message || ' '}
                            error={!!errors.body?.message}
                            {...register("body", {
                                required: 'Text is required!',
                            })}
                        />
                    </div>

                    <div className={style.tags}>
                        <span className={style.spanInput}>Tags</span>
                        {tags.length ? tags.map((tag, index, tagsArr) => <TagsForm
                                    addNewTag={addNewTag}
                                    isLastTag={tagsArr.length - 1 === index}
                                    fieldId={tag + index}
                                    key={tag + index}
                                    index={index}
                                    onChangeValue={onChangeValueTags}
                                    tag={tag}
                                    removeItemFromTags={removeItemFromTags}
                                />
                            ) :
                            <Button variant={'outlined'} color={'primary'} className={style.addButton}
                                    onClick={addNewTag}>Add
                                Tag</Button>}
                    </div>
                    <div className={style.sendButton}>
                        <Button variant={'contained'} onClick={handleSubmit(onSubmit)}>Send</Button>
                    </div>
                </>}
        </div>

    </ThemeProvider>
}
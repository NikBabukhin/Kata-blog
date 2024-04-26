import React from "react";
import style from "./TagsForm.module.scss"
import {Button, TextField} from "@mui/material";

type TagsFormPropsType = {
    fieldId: string,
    isLastTag: boolean,
    tag: string,
    index: number,
    onChangeValue: (index: number, value: string) => void,
    removeItemFromTags: (tagsIndex: number) => void,
    addNewTag: () => void,
    isEdit?: boolean
}


export const TagsForm: React.FC<TagsFormPropsType> = ({
                                                          fieldId,
                                                          isLastTag,
                                                          tag,
                                                          index,
                                                          onChangeValue,
                                                          removeItemFromTags,
                                                          addNewTag,
                                                          isEdit,
                                                      }) => {
    const saveChanges = (value: string) => {
        onChangeValue(index, value)
    }

    return <div className={style.wrapper}>
        <TextField
            id={fieldId}
            value={tag}
            onChange={event => saveChanges(event.currentTarget.value)}
            placeholder={'Tag'}
            className={style.field}
            size={'small'}
            autoFocus
        />
        <Button variant={'outlined'} color={'error'}
                onClick={() => removeItemFromTags(index)}>Delete</Button>
        {isLastTag &&
            <Button variant={'outlined'} color={'primary'} onClick={addNewTag}>Add Tag</Button>}
    </div>
}
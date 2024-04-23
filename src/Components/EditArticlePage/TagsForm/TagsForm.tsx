import React, {useState} from "react";
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
}


export const TagsForm: React.FC<TagsFormPropsType> = ({
                                                          fieldId,
                                                          isLastTag,
                                                          tag,
                                                          index,
                                                          onChangeValue,
                                                          removeItemFromTags,
                                                          addNewTag
                                                      }) => {
    const [value, setValue] = useState<string>(tag)
    const saveChanges = () => {
        onChangeValue(index, value)
    }

    return <div className={style.wrapper}>
        <TextField
            id={fieldId}
            value={value}
            onBlur={saveChanges}
            onChange={event => setValue(event.currentTarget.value)}
            placeholder={'Tag'}
            className={style.field}
            size={'small'}
        />
        <Button variant={'outlined'} color={'error'} onClick={() => removeItemFromTags(index)}>Delete</Button>
        {isLastTag && <Button variant={'outlined'} color={'primary'} onClick={addNewTag}>Add Tag</Button>}
    </div>
}
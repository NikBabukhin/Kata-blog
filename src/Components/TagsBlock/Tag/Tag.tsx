import React from "react";
import style from "./Tag.module.scss"

type TagPropsType = {
    tagValue: string,
    isShortContent: boolean
}

export const Tag: React.FC<TagPropsType> = ({tagValue, isShortContent}) => {

    const getCorrectTagText = (text: string): string => {
        if (text.trim().length < 15) {
            return text.trim()
        } else {
            return text.trim().slice(0, 12) + '...'
        }
    }

    return tagValue ?
        <div className={style.tag} title={tagValue}>{isShortContent ? getCorrectTagText(tagValue) : tagValue}</div> :
        <></>
}
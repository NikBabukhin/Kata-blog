import React from "react";
import style from './TagsBlock.module.scss';
import {Tag} from "./Tag/Tag";

type TagsBlockPropsType = {
    isShortContent: boolean,
    tags?: string[],
}

export const TagsBlock: React.FC<TagsBlockPropsType> = ({isShortContent, tags}) => {
    const tagsForShow = () => {
        if (isShortContent && tags && tags?.length > 3) {
            return <>
                {tags.slice(0, 3).map((tag, index) => <Tag key={tag+index} tagValue={tag} isShortContent={isShortContent}/>)}
                <span className={style.moreText}>and {tags.length - 3} more</span>
            </>
        } else if (tags && tags.length) {
            return tags.map((tag, index) => <Tag key={tag+index} tagValue={tag} isShortContent={false}/>)
        } else {
            return <span className={style.moreText}>Article has no tag</span>
        }
    }

    return <div className={style.wrapper}>{tagsForShow()}</div>
}
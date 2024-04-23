import React, {Dispatch, SetStateAction} from "react";
import style from './PopupBody.module.scss';
import warningImage from '../../../../../assets/image/warning.svg'

type PopupBodyPropsType = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    confirmMove?: ()=>void,
}

export const PopupBody:React.FC<PopupBodyPropsType> = ({ open, setOpen, confirmMove }) => {

    const onClickYesHandler = () => {
        confirmMove && confirmMove()
        setOpen(false)
    }

    return <>{open && <div className={style.popupWrapper}>
        <div className={style.messageWrapper}>
            {warningImage && <img src={warningImage} width={16} height={16}/>}
            <span className={style.text}>Are you sure to delete this article?</span>
        </div>
        <div className={style.buttonWrapper}>
            <button className={style.buttonNo} onClick={()=>setOpen(false)}>No</button>
            <button className={style.buttonYes} onClick={onClickYesHandler}>Yes</button>
        </div>
    </div>}</>
}
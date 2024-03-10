import React from "react";
import st from "./Error.module.scss";
import { PASSWORD, TIMESTAMP, KEY_ACCESS } from "../constants/authentication"



const Error401: React.FC = () => {
    return (
        <div className={st.error}>
            <div className={st.errorInfo}>
                <h1>Ошибка 401</h1>
                <span>Пароль: {PASSWORD} </span>
                <span>Таймштамп: {TIMESTAMP}</span>
                <span>md5-код: {KEY_ACCESS}</span>  
            </div>
        </div>
    )
}


export default Error401;



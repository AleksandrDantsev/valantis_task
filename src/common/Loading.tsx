import React from 'react';
import st from "./Loading.module.scss";


const Loading: React.FC = () => {
    return(
        <div className={st.load_window}>
            <div className={st.load_square}>
                <span className={st.anim0}></span>
                <span className={st.anim1}></span>
                <span className={st.anim2}></span>
                <span className={st.anim3}></span>
            </div>
        </div>
    )
}


export default Loading


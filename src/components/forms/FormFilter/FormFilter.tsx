import React from 'react';
import st from "./FormFilter.module.scss";
import SearchName from './SearchName/SearchName';



const FormFilter: React.FC = () => {

    return(
        <form className={st.formSearh}>
            <SearchName />
            
        </form>
    )
}



export default FormFilter
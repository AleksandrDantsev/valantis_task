import React from "react";
import st from "./SearchName.module.scss"


const SearchName: React.FC = () => {

    return(
        <div className={st.search_name}>
            <label htmlFor="search-name">Искать по имени</label>
            <input type="text" id="search-name"/>
        </div>
    )
}



export default SearchName
import React from "react";
import st from "./SearchBrand.module.scss"
import { debounce } from "../../../../helpers/debounce";

interface ISearchBrandProps {
    setSearchBrandQuery: (arg: string) => void;
}

const SearchBrand: React.FC<ISearchBrandProps> = ({setSearchBrandQuery}) => {

    const changeSearchNameInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearchBrandQuery(target.value)
    }, 1200)

    return(
        <div className={st.search_cost}>
            <label htmlFor="search-brand">Искать бренд</label>
            <input onChange={changeSearchNameInput} type="text" id="search-brand"/>
        </div>
    )
}


export default SearchBrand
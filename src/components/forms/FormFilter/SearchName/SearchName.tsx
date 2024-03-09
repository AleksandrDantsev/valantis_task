import React from "react";
import st from "./SearchName.module.scss"
import { debounce } from "../../../../helpers/debounce";

interface ISearchNameProps {
    setSearcNameQuery: (arg: string) => void;
}

const SearchName: React.FC<ISearchNameProps> = ({setSearcNameQuery}) => {

    const changeSearchNameInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearcNameQuery(target.value)
    }, 1000)

    return(
        <div className={st.search_name}>
            <label htmlFor="search-name">Искать по имени</label>
            <input onChange={changeSearchNameInput} type="text" id="search-name"/>
        </div>
    )
}


export default SearchName
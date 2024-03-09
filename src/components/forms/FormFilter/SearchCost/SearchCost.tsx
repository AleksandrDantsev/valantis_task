import React from "react";
import st from "./SearchCost.module.scss"
import { debounce } from "../../../../helpers/debounce";

interface ISearchCostProps {
    setSearchCostQuery: (arg: number) => void;
}

const SearchCost: React.FC<ISearchCostProps> = ({setSearchCostQuery}) => {

    const changeSearchNameInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearchCostQuery(Number(target.value))
    }, 1200)

    return(
        <div className={st.search_cost}>
            <label htmlFor="search-cost">Искать по стоимости</label>
            <input onChange={changeSearchNameInput} type="number" id="search-cost"/>
        </div>
    )
}


export default SearchCost
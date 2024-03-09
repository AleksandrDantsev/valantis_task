import React, { memo } from 'react';
import st from "./FormFilter.module.scss";
import SearchName from './SearchName/SearchName';
import SearchBrand from './SearchBrand/SearchBrand';
import SearchCost from './SearchCost/SearchCost';

interface IFormFilter {
    setSearcNameQuery: (arg: string) => void;
    setSearchBrandQuery: (arg: string) => void;
    setSearchCostQuery: (arg: number) => void;
}

const FormFilter: React.FC<IFormFilter> = memo(({setSearcNameQuery,
                                            setSearchBrandQuery,
                                            setSearchCostQuery,
                                        }) => {
    return(
        <form className={st.formSearh}>
            <SearchName setSearcNameQuery={setSearcNameQuery}/>
            <SearchBrand setSearchBrandQuery={setSearchBrandQuery}/>
            <SearchCost setSearchCostQuery={setSearchCostQuery}/>
        </form>
    )
})



export default FormFilter
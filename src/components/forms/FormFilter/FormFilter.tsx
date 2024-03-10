import React, { memo } from 'react';
import st from "./FormFilter.module.scss";
import { debounce } from '../../../helpers/debounce';

interface IFormFilter {
    searcQueryMode: string;
    setSearcQueryMode: (arg: string) => void;
    setSearchTextRequest: (arg: string) => void;
}

const FormFilter: React.FC<IFormFilter> = memo(({searcQueryMode, setSearcQueryMode, setSearchTextRequest}) => {

    const changeSearchNameInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearchTextRequest(target.value)
    }, 1500)
                        
    const choiseButtonModeSearch = (e: React.MouseEvent<HTMLUListElement>) => {
        e.preventDefault();
        const target = e.target as HTMLLinkElement;
        if (target.tagName === "A") setSearcQueryMode(target.id);
    }

    return(
        <form className={st.formSearh}>
            <div className={st.search}>
                <label className={st.title} htmlFor="search">Искать по: </label>
                <div className={st.switcher_mode_search}>
                    <ul className={st.switcher_mode_search_list} onClick={choiseButtonModeSearch}>
                        <li><a id={"product"} href="#">Имени</a></li> 
                        <li><a id={"price"} href="#">Цене</a></li> 
                        <li><a id={"brand"} href="#">Бренду</a></li> 
                    </ul>
                </div>
                <input className={st.search_input} onChange={changeSearchNameInput} type={searcQueryMode === "price" ? "number" : "text"} id="search"/>
            </div>
        </form>
    )
})


export default FormFilter
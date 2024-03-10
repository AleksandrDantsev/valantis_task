import React, { memo, useRef } from 'react';
import st from "./FormFilter.module.scss";
import { debounce } from '../../../helpers/debounce';

interface IFormFilter {
    searcQueryMode: string;
    setSearcQueryMode: (arg: string) => void;
    setSearchTextRequest: (arg: string) => void;
    setPaginationNumber: (arg: number) => void;
}

const FormFilter: React.FC<IFormFilter> = memo(({searcQueryMode, setSearcQueryMode, setSearchTextRequest, setPaginationNumber}) => {
    const input = useRef<HTMLInputElement | null>(null)

    const changeSearchNameInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setPaginationNumber(0);
        setSearchTextRequest(target.value);
    }, 1600)
                        
    const choiseButtonModeSearch = (e: React.MouseEvent<HTMLUListElement>) => {
        e.preventDefault();
        const target = e.target as HTMLLinkElement;
        if (target.tagName === "A") {
            if (input.current !== null) input.current.value = ''

            if (target.id === searcQueryMode) {
                setSearchTextRequest('');
                setSearcQueryMode('');
            }
            else setSearcQueryMode(target.id);
        }
    }
    console.log(searcQueryMode)
    return(
        <form className={st.formSearh}>
            <div className={st.search}>
                <label className={st.title} htmlFor="search">Искать по: </label>
                <div className={st.switcher_mode_search}>
                    <ul className={st.switcher_mode_search_list} onClick={choiseButtonModeSearch}>
                        <li><a className={searcQueryMode === "product" ? st.active_filter : ''} id={"product"} href="#">Имени</a></li> 
                        <li><a className={searcQueryMode === "price" ? st.active_filter : ''} id={"price"} href="#">Цене</a></li> 
                        <li><a className={searcQueryMode === "brand" ? st.active_filter : ''} id={"brand"} href="#">Бренду</a></li> 
                    </ul>
                </div>
                <input className={Boolean(searcQueryMode) === false ? st.search_input + ' ' + st.deactive_input : st.search_input}
                       onChange={changeSearchNameInput}
                       placeholder='Запрос'
                       type={searcQueryMode === "price" ? "number" : "text"} 
                       id="search"
                       ref={input} />
            </div>
        </form>
    )
})


export default FormFilter
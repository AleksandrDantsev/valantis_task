import React, { memo } from "react";
import st from "./Pagination.module.scss"

interface IPagination {
    setPaginationNumber: (arg: number) => void,
    lengthArrayProducts: number;
    quantityProductOnPage: number;
}

const Pagination: React.FC<IPagination> = memo(({setPaginationNumber, 
                                                lengthArrayProducts, 
                                                quantityProductOnPage}) => {

    const setPaginationNumberHandler = (e: React.MouseEvent<HTMLDListElement>): void => {
        e.preventDefault()
        const target = e.target as HTMLLIElement
        if (target.tagName == "A") setPaginationNumber(Number(target.textContent))
    } 

    const paintPaginationElement = () => {
        const quantity = Math.ceil(lengthArrayProducts / quantityProductOnPage) + 1;
        return new Array(quantity).fill(0).map((el, i) => el = i + 1)
    }

    return (
        <div className={st.pagination}>
            <ul className={st.pagination_list} onClick={setPaginationNumberHandler}>
                {paintPaginationElement().map(el => <li className={st.pagin_crumb} key={el}><a href="#">{el}</a></li>)}
            </ul>
        </div>
    )
})


export default Pagination


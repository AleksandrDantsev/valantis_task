import React, { memo, useState  } from "react";
import st from "./Pagination.module.scss"

interface IPagination {
    setPaginationNumber: (arg: number) => void,
    lengthArrayProducts: number;
    quantityProductOnPage: number;
    paginationNumber: number;
}

const Pagination: React.FC<IPagination> = memo(({setPaginationNumber, 
                                                lengthArrayProducts, 
                                                quantityProductOnPage,
                                                paginationNumber}) => {
    const [numberPagBt, setNumberPagBt] = useState<string>('0')

    const setPaginationNumberHandler = (e: React.MouseEvent<HTMLDListElement>): void => {
        e.preventDefault()
        const target = e.target as HTMLLIElement
        if (target.tagName == "A") {
            setPaginationNumber(Number(target.textContent) - 1);

            const dataNumber = target.getAttribute('data-number');
            if (dataNumber) setNumberPagBt(dataNumber)
        }
    } 

    let quantity = Math.ceil(lengthArrayProducts / quantityProductOnPage);

    const paintPaginationElement = () => {
        if (quantity > 10) {
            return new Array(10).fill(0).map((_el, i) => {
                if (i === 9) return quantity
                if (paginationNumber < Math.round(9 / 2)) {
                    return _el = i + 1
                } 
                else if (paginationNumber + Math.round(9 / 2) >= quantity || paginationNumber <= Math.round(9 / 2)) {
                    return _el = quantity - (9 - i)
                }
                else {
                    if (+numberPagBt < Math.floor(9 / 2)) {
                        return _el = paginationNumber + (i - Math.floor(9 / 2 - 1))
                    }
                    else {
                        return _el = paginationNumber + i - Math.floor(9 / 2 - 1)
                    }
                }
            })
        }
        else {
            return new Array(quantity).fill(0).map((_el, i) =>  _el = i + 1)
        }
    }

    return (
        <div className={st.pagination}>
            <ul className={st.pagination_list} onClick={setPaginationNumberHandler}>
                {paintPaginationElement().map((el, i) => (
                    <li className={st.pagin_crumb} key={el + i + Math.random()}>
                        {paginationNumber <= quantity - 7 && i == 8 ? <p>---</p> : <a data-number={i+1} className={paginationNumber+1 == Number(el) ? st.active_bt : ''} href="#">{el}</a>}
                    </li>))}
            </ul>
        </div>
    )
})


export default Pagination


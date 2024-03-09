import React, { memo } from "react";

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
        if (target.tagName == "LI") setPaginationNumber(Number(target.textContent))
    } 

    const paintPaginationElement = () => {
        const quantity = Math.ceil(lengthArrayProducts / quantityProductOnPage)

        return new Array(quantity).fill(0).map((el, i) => el = i + 1)
    }
    console.log(paintPaginationElement())
    return (
        <div>
            <ul onClick={setPaginationNumberHandler}>
                {paintPaginationElement().map(el => <li><a href="#">{el}</a></li>)}
            </ul>
        </div>
    )
})


export default Pagination


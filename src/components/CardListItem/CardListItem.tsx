import React from "react";
import st from "./CardListItem.module.scss"

interface ICardListItem {
    brand: null | string;
    id: string,
    price: string;
    product: string;
    
}


export const CardListItem: React.FC<ICardListItem> = ({brand, id, price, product}) => {


    return (
        <div className={st.card_list_item}>
            {Boolean(brand) && brand}
            <div>{product}</div>
            <div>{price}</div>    
            <div>{id}</div>
        </div>
    )
}


export default CardListItem


import React from "react";
import st from "./CardListItem.module.scss"
import { checkTypeProduct } from "../../helpers/importImages";

interface ICardListItem {
    brand: null | string;
    id: string,
    price: string;
    product: string;
    
}


export const CardListItem: React.FC<ICardListItem> = ({brand, id, price, product}) => {

    return (
        <div className={st.card_list_item}>
            {Boolean(brand) && <div className={st.brand}>{brand}</div>}
            <img className={st.backgr_image} src={checkTypeProduct(product)} alt={product} />
            <div className={st.title}><h3>{product}</h3></div>
            <div className={st.price}>{price}р</div>    
            <div className={st.id}>{id}</div>
        </div>
    )
}


export default CardListItem


import React, { useState, useEffect } from "react";
import st from "./listProducts.module.scss"
import { KEY_ACCESS } from '../constants/authentication';
import { fetchCustom } from "../helpers/fetchData";
import Pagination from "../components/Pagination/Pagination";
import CardListItem from "../components/CardListItem/CardListItem";
import { productsInfoType } from "../types/fetchTypes";
import FormFilter from "../components/forms/FormFilter/FormFilter";

const fetchValantisURL = fetchCustom("https://api.valantis.store:41000/", KEY_ACCESS)

const ListProducts: React.FC = () => {
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productInfo, setProductInfo] = useState<productsInfoType>({result: []})
    const [filter, setFilter] = useState(66)

    const quantityShowCard = 50

    useEffect(() => {
        const filterOrAllProd = filter ? fetchValantisURL("filter", {"product": "колье"}) :
                                fetchValantisURL("get_ids", {"offset": quantityShowCard * paginationNumber, "limit": 65})

        filterOrAllProd.then(el => fetchValantisURL("get_items", {"ids": el}))
                       .then(el => setProductInfo(el))
        
    }, [paginationNumber])

  
   
  


    console.log(productInfo)
    
  
 

    return (
        <React.Fragment>
            <div className={st.list_product_wrapper}>
                <div className={st.actions_page}>
                    <FormFilter />
                    <Pagination setPaginationNumber={setPaginationNumber}
                                lengthArrayProducts={productInfo.result.length}
                                quantityProductOnPage={quantityShowCard} />
                </div>
                
                <div className={st.list_product}>
                    {   
                        productInfo.result.length > 0 && productInfo.result.map((element: any) => <CardListItem 
                            key={element.id}
                            brand={element!.brand}
                            id={element!.id}
                            price={element!.price}
                            product={element!.product}
                        />)
                    }
                    
                </div>
            </div>
        </React.Fragment>
    )
}


export default ListProducts



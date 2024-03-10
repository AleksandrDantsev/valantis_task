import React, { useState, useEffect } from "react";
import st from "./listProducts.module.scss"
import { Fetch } from "../helpers/fetchData";
import Pagination from "../components/Pagination/Pagination";
import CardListItem from "../components/CardListItem/CardListItem";
import { productsInfoTypeArray, productsInfoType } from "../types/fetchTypes";
import FormFilter from "../components/forms/FormFilter/FormFilter";
import Loading from "../common/Loading";
import { checkIsDigital } from "../helpers/checkIsDigital";


const ListProducts: React.FC = () => {
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productInfo, setProductInfo] = useState<productsInfoTypeArray | undefined[]>([])
    const [searcQueryMode, setSearcQueryMode] = useState<string>('')
    const [searchTextRequest, setSearchTextRequest] = useState<string>('')

    const quantityShowCard = 50

    useEffect(() => {  
        if (Boolean(searcQueryMode) === false || Boolean(searchTextRequest) === false) {
            setProductInfo([]);
            Fetch.get('get_ids', {"offset": quantityShowCard * (paginationNumber - 1), "limit": 60}).then(el => 
            Fetch.get('get_items', {"ids": el})).then(el => setProductInfo(el))
        }
    }, [paginationNumber, searchTextRequest])


    useEffect(() => { 
            setProductInfo([]);
            if (Boolean(searcQueryMode) === true && Boolean(searchTextRequest) === true) { {
                Fetch.get('filter', {[searcQueryMode]: checkIsDigital(searchTextRequest)}).then(el => {

                return (Fetch.get('get_items', {"ids": el}))
                }).then(el => setProductInfo(el)
                )
            }
        }
    }, [searchTextRequest])

    console.log(productInfo.length)

    const getPartialElementPagin = () => {
        if (searcQueryMode && searchTextRequest) {
            let oneStep = quantityShowCard * paginationNumber;
            let twoStep = quantityShowCard * paginationNumber + quantityShowCard;
    
            if (twoStep >= productInfo.length) twoStep = productInfo.length;
            console.log(twoStep)
            const paginationCurrent = productInfo.slice(oneStep, twoStep);
            return paginationCurrent
        }
        else return productInfo;
    }
    console.log(getPartialElementPagin())
  
    return (
        <React.Fragment>
            {productInfo.length > 2 &&
            <div className={st.quantity_prod}>
                Товаров на странице: {productInfo[0] !== undefined ? getPartialElementPagin().length : ''}
            </div>
            }
            <div className={st.list_product_wrapper}>
                <div className={st.list_product}>
                    {productInfo.length === 0 && <Loading />}
                    {(productInfo.length > 2 && productInfo[0] !== undefined) ? 
                      getPartialElementPagin().map((element: productsInfoType | undefined) => <CardListItem 
                                key={element!.id}
                                brand={element?.brand}
                                id={element!.id}
                                price={element!.price}
                                product={element!.product}
                    />)
                    :<div className={st.not_found}>
                        <span>Ничего не найдено. Попробуйте изменить фильтр</span>
                     </div>
                    }       
                </div>
                <div className={st.actions_page}>
                    <FormFilter setSearcQueryMode={setSearcQueryMode}
                                searcQueryMode={searcQueryMode}
                                setSearchTextRequest={setSearchTextRequest}
                                setPaginationNumber={setPaginationNumber}
                    />
                    <Pagination setPaginationNumber={setPaginationNumber}
                                lengthArrayProducts={searcQueryMode && searchTextRequest ? productInfo.length : 6250}
                                quantityProductOnPage={quantityShowCard}
                                paginationNumber={paginationNumber} />
                </div>
            </div>
        </React.Fragment>
    )
}


export default ListProducts



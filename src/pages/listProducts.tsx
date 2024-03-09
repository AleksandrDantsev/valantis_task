import React, { useState, useEffect } from "react";
import st from "./listProducts.module.scss"
import { Fetch } from "../helpers/fetchData";
import Pagination from "../components/Pagination/Pagination";
import CardListItem from "../components/CardListItem/CardListItem";
import { productsInfoTypeArray, productsInfoType } from "../types/fetchTypes";
import FormFilter from "../components/forms/FormFilter/FormFilter";
import Loading from "../common/Loading";


const ListProducts: React.FC = () => {
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [productInfo, setProductInfo] = useState<productsInfoTypeArray>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchNameQuery, setSearcNameQuery] = useState<string>('')
    const [searchBrandQuery, setSearchBrandQuery] = useState<string | null>(null)
    const [searchCostQuery, setSearchCostQuery] = useState<number | null>(null)

    const quantityShowCard = 50

    const typeSearch = (() => {
        const typeSearchDict = {
            name: "product",
            brand: "brand",
            cost: "price",
        }

        if (searchNameQuery) return [typeSearchDict["name"], searchNameQuery]
        else if (searchBrandQuery) return [typeSearchDict["brand"], searchBrandQuery]
        else if (searchCostQuery) return [typeSearchDict["cost"], searchCostQuery]
        return ["product", searchNameQuery]
    })()
  
    useEffect(() => {
        
        function getData() {
            setIsLoading(true);
            if ([searchNameQuery, searchBrandQuery, searchCostQuery].every(el => Boolean(el) === false)) {
                Fetch.get('get_ids', {"offset": quantityShowCard * paginationNumber, "limit": 60}).then(el => (
                Fetch.get('get_items', {"ids": el}))).then(el => setProductInfo(el))
    
           }
           else {
                const type = typeSearch[0]
                Fetch.get('filter', {[type]: typeSearch[1]}).then(el => (
                Fetch.get('get_items', {"ids": el}))).then(el => setProductInfo(el))  
           }
        }

        try {
            getData();
            if (productInfo.length > 0) setIsLoading(false);
        }
        catch(err) {
            console.log(err)
            getData()
        }
       

    }, [paginationNumber, searchNameQuery, searchBrandQuery, searchCostQuery])

  
    console.log(productInfo)
    

    return (
        <React.Fragment>
            <div className={st.list_product_wrapper}>
                <div className={st.list_product}>
                {Boolean(isLoading) && <Loading />}
                    {   
                        productInfo.length > 0 && productInfo.map((element: productsInfoType) => <CardListItem 
                                key={element.id}
                                brand={element!.brand}
                                id={element!.id}
                                price={element!.price}
                                product={element!.product}
                        />)
                    }       
                </div>
                <div className={st.actions_page}>
                    <FormFilter setSearcNameQuery={setSearcNameQuery}
                                setSearchBrandQuery={setSearchBrandQuery}
                                setSearchCostQuery={setSearchCostQuery}
                    />
                    <Pagination setPaginationNumber={setPaginationNumber}
                                lengthArrayProducts={productInfo.length}
                                quantityProductOnPage={quantityShowCard} />
                </div>
            </div>
        </React.Fragment>
    )
}


export default ListProducts



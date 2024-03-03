import React from "react";
import { KEY_ACCES } from '../constants/authentication';
import { fetchCustom } from "../helpers/fetchData";

const fetchValantisURL = fetchCustom("https://api.valantis.store:41000/", KEY_ACCES)

export const ListProducts: React.FC = () => {
    

     fetchValantisURL("get_ids", {"offset": 0, "limit": 1000})
        

    
  
 

    return (
        <div>

        </div>
    )
}




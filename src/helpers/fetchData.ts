import { KEY_ACCESS } from '../constants/authentication';
import { productsInfoType } from '../types/fetchTypes';



class FetchValantis {
    private url = "https://api.valantis.store:41000/";
    private key = KEY_ACCESS;


    public async get(method: string, params: {[key: string] : string | number | string[] | undefined[]}): Promise<any> {
        
        try {
            const fetchResult = await fetch(this.url, {
            method: "POST", 
                headers: {
                    "X-Auth": this.key,
                    "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "action": method,
                "params": params,
            }),   
            })

            const gotArrayProduct = await fetchResult.json()
            const array = gotArrayProduct?.result;

            if (method === "get_ids" || method === "filter") {  
                let hash: {[key: string]: number} | null = {}

                for (let item of array) {
                    if (!hash[item]) hash[item] = 1
                }

                const result = Object.keys(hash)

                hash = null;
                return method === "filter" ? result : result.slice(0, 50)
            }

            else if (method === "get_items") {
                const resultArray: any = [array[0]]
                
                for (let i = 0; i < array.length; i++) {
                    if (!resultArray.find((el: productsInfoType) => el.id == array[i].id)) resultArray.push(array[i])
                }
                return resultArray
            }     
        }

        catch(error: any) {
            console.log(error);
            if (String(error).indexOf("Authentica") != -1) {
                return ['401']; 
            }

            return this.get(method, params);
        }
    
        return [undefined];
    }
}

const Fetch = new FetchValantis()


export { Fetch }
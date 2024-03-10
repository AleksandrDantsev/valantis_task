import { KEY_ACCESS } from '../constants/authentication';
import { productsInfoType } from '../types/fetchTypes';


class FetchValantis {
    private url = "http://api.valantis.store:40000/";
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
                const hash: {[key: string]: number} = {}

                for (let item of array) {
                    if (!hash[item]) hash[item] = 1
                }
                return Object.keys(hash).slice(0, 50)
            }

            else if (method === "get_items") {
                const resultArray: any = [array[0]]
                
                for (let i = 0; i < array.length; i++) {
                    if (!resultArray.find((el: productsInfoType) => el.id == array[i].id)) resultArray.push(array[i])
                }
                return resultArray
            }     
        }

        catch(error) {
            console.log(error);

            let unsuccessfulAttempt = 0;
            let result;
            while (!result || unsuccessfulAttempt < 5) {
                result = this.get(method, params);
                unsuccessfulAttempt += 1;
            }
            return result;
        }
    
        return [undefined];
    }
}

const Fetch = new FetchValantis()


export {Fetch}
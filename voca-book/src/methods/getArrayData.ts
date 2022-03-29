import axios from 'axios';
import { truncate } from 'fs/promises';
import { IP } from 'pages/vocaBook';

export const getArrayData = async(param?:string):Promise<any[]> => {
    let getAllData:any[] ;
    let isLoading = false;
    try {
        const result = await axios.get(param ? IP+param : IP);
        getAllData = result.data;
        getAllData.forEach((dt,index) => {
            dt.index = Number(index+1);
        })
    } catch(e:any) {
        throw new Error(e);
    } finally{
        isLoading = true;
    }
    return [getAllData,isLoading];
}
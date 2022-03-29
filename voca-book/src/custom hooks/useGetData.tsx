import { useState, useContext, useEffect } from "react";
import { AllData } from "App";
import {getArrayData} from '../methods/getArrayData'


type GetData = {
    isLoading: boolean,
}

export const useGetData = ()=> {

    const {setData} = useContext(AllData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect((reload:boolean = false) => {
        const getData = async() => {
            const data = await getArrayData();
            data.forEach((dt,index) => {
                dt.index = Number(index+1);
            })
            setData(data);
        }
        getData();
    },[])
    //return [isLoading];
}
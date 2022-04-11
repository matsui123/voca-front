import { AllData } from 'App';
import React,{ FC, useState, memo, useContext,useMemo } from 'react';
import { getArrayData } from 'methods/getArrayData';

type getData = {
    id: number,
    english: string,
    japanese: string,
    memo: string,
    sound: null | string
}

type Search = [
    search: string,
    onSearch:(e:any) => void
]

export const useSearch = ():Search => {
    const [search, setSearch] = useState<string>('');
    const {data, setData} = useContext(AllData);
    //結果保持できてない
    let allData:getData[];
    let isLoading:boolean;
    const getTempData= async() => {
        [allData, isLoading] = await getArrayData();
    }

    useMemo(() => {getTempData()},[]);
    const onSearch = async(event:any ) => {
        const input:string = event.target.value;
        setSearch(input);
        await getTempData();
        console.log(allData);
        setData(allData.filter((dt:any) => {
            return dt.english.includes(input)
            || dt.japanese.includes(input)
            || dt.memo.includes(input);
        }));
    }
    return [search, onSearch];
}
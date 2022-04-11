import {FC, useState, memo, useContext,useCallback} from 'react';
import axios from 'axios';
import {AllData} from '../App';
import {IP} from '../pages/vocaBook';
import {getArrayData} from '../methods/getArrayData';

type Words = {
    en:string,
    jp:string,
    memo:string
}
//isLoadingの処理入れる
export const usePostData = ():[
    {en:string,jp:string,memo:string},{handleEn:(e:any) => void,handleJp:(e:any) => void,handleMemo:(e:any) => void,handleRegister:() => void}
] => {

    //state　TODO:一つのstateにまとめられる
    const [en,setEn] = useState<string>('');
    const [jp,setJp] = useState<string>('');
    const [memo,setMemo] = useState<string>('');

    //handle
    const handleEn = useCallback((e:any) => setEn(e.target.value), []);
    const handleJp = useCallback((e:any) => setJp(e.target.value), []);
    const handleMemo = useCallback((e:any) => setMemo(e.target.value), []);

    const {setData, setIsLoading} = useContext(AllData);

    //handleRegisterにuseCallbackいれるとuseStateの値が読まれない
    //依存関係がおかしいから？
    const handleRegister = async () => {
       //if (isLoading) return;
        if (en === '' || jp === '') return;
        const params = {
            en: en,
            jp: jp,
            memo: memo
        }
        console.log(params);
        await postInfo(params);
        resetInput();
        const [getAllData] = await getArrayData();
        setData(getAllData);
        setIsLoading(true);
    };

    const postInfo = async (params: Words): Promise<void> => {
        //if(isLoading) return;
        //updateLoading(true);
        console.log(`postInfo`);
        try {
            const data = await axios.post(IP,params);
            console.log(data.data);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            //updateLoading(false);
        }
    }

    const resetInput = useCallback(() =>{
        setEn('');
        setJp('');
        setMemo('');
    }, []);

    return [{en, jp, memo},{handleEn, handleJp, handleMemo, handleRegister}]
}
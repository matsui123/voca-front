import { FC, useState, useEffect, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { IP } from '../pages/vocaBook';
import { AllData } from '../App'
import { WrapperEditModal } from '../styled-components/WrapperEditModal'
import { getArrayData } from 'methods/getArrayData';

type Props = {
    updateEditModal:(prop:boolean) => void,
    dt:any,
    wrongFlg:boolean,
    updateWrongFlg:(prop:boolean) => void
}


export const EditModal = (props:Props) => {
    const { updateEditModal, dt, wrongFlg, updateWrongFlg } = props;
    console.log(dt);
    const {setData} = useContext(AllData);

    const handleEdit = async() => {
        await postEditInfo();
        //setData(await getArrayData());
        updateEditModal(false);

    }

    const postEditInfo = async() => {
        const wrong = wrongFlg ? true : undefined;
        const params = {
            id: dt.id,
            en: en,
            jp: jp,
            memo: memo,
            wrong
        }
        const ip_edit = `${IP}edit`;
        //TODO:isLoadingの処理必要
        try {
            const data = await axios.post(ip_edit,params);
            console.log(data.data);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            //updateLoading(false);
        }
        //サーバーおちる
        const [AllArrayData] = await getArrayData();
        setData( AllArrayData );
        //setEdit(false);
    }

    //state
    const [en,setEn] = useState<string>(dt?.english);
    const [jp,setJp] = useState<string>(dt?.japanese);
    const [memo,setMemo] = useState<string>(dt?.memo);

    //handle
    const handleEn = (e:any) => setEn(e.target.value);
    const handleJp = (e:any) => setJp(e.target.value);
    const handleMemo = (e:any) => setMemo(e.target.value);
        return(
            <>
                <WrapperEditModal>
                    <TextField  className="side-margin" id="standard-basic" label="English" variant="standard"  value={en} onChange={handleEn}/>
                    <TextField className="side-margin" id="standard-basic" label="日本語" variant="standard"  value={jp} onChange={handleJp}/>
                    <TextField className="side-margin" id="standard-basic" label="メモ" variant="standard"  value={memo} onChange={handleMemo}/>
                </WrapperEditModal>
                <WrapperEditModal>
                    <Button className="side-margin"variant="contained" color="error" onClick={() => updateEditModal(false)}>cancel</Button>
                    <Button className="side-margin" variant="contained" color="info" onClick={handleEdit}>edit</Button>
                </WrapperEditModal>
            </>
        );
}
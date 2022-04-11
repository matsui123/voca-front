import {FC, useState, memo, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import {CardsInModal} from './cardsInModal';
import '../App.css'
import { AllData } from '../App'

//TODO:数値のみのバリデーション追加
type getData = {
    id: number,
    english: string,
    japanese: string,
    memo: string,
    sound: null | string
};

type Prop = {
    setWords: (props:any) => void,
    check: string[],
    selectedData: any,
    setSelectedData: any;
};

export const CheckBoxForm:FC<Prop> = memo((props:Prop) => {
    const { setWords, check, selectedData, setSelectedData } = props;
    const {data} = useContext(AllData);

    const [begin,setBegin] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);

    const handleBegin = (e:any) => setBegin(Number(e.target.value));
    const handleEnd = (e:any) => setEnd(Number(e.target.value));


    const updateModal = (prop:boolean) => setModal(prop);

    const openCardModal = () => {
        let checkAll:string[] = [];
        if (begin !== 0 && end !== 0) {
            console.log(`複数選択`);
            //formのnumberとcheckのnumberを合わせる
            const formCheck:number[] = [];
            for(let i:number = Number(begin); i <= Number(end); i++){
                const objectValue = data.filter((dt:any) => dt.index === i);
                setSelectedData((prev: any)=>[...prev, ...objectValue]);
            }
        }
        //modal出す modalに合致したオブジェクト渡す
        setModal(true);
    }

    return(
        <>
            <TextField className="side-margin" id="standard-basic" label="Begin" variant="standard"  value={begin} onChange={handleBegin}/>
            <TextField className="side-margin" id="standard-basic" label="End" variant="standard"  value={end} onChange={handleEnd}/>
            <Button className="side-margin"variant="outlined" onClick={openCardModal}>選択</Button>
            <Modal className="modal" overlayClassName="overlay" isOpen={modal} >
                <CardsInModal data={selectedData} updateModal={updateModal}></CardsInModal>
            </Modal>
        </>
    )
})
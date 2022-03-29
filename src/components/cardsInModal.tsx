import {FC,useState, useEffect} from 'react';
import '../App.css'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import axios from 'axios';
import {IP} from '../pages/vocaBook'
import * as SC from '../styled-components/WrapperCards'

type getData = {
    id: any,
    english: string,
    japanese: string,
    memo: string,
    sound: null | string
}

type Props = {
    data:getData[],
    updateModal: (prop:boolean) => void
}

type Words = {
    en:string,
    jp:string,
    memo:string
}

export const CardsInModal:FC<Props> = (props:Props) => {
    const {data, updateModal} = props;
    console.log(data)
    //state
    const [nowModal, setNowModal] = useState<string>('start');
    const [check, setCheck] = useState<string[]>([]);
    const [cardNum, setCardNum] = useState<number>(0);
    const [wrong, setWrong] = useState<getData[]>([]);
    const [correct, setCorrect] = useState<getData[]>([]);
    const [testData, setTestData] = useState<getData[]>([]);
    const [isFront, setIsFront] = useState<boolean>(true);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const setWords = (e:any) => {
        const wh = e.target.value;
        check.includes(wh) ? setCheck(check.filter((ch:string) => ch !== wh))
        : setCheck([...check, wh]);
    }

    const toTesting = () => {
        wrong.length === 0 ? setTestData(data) : setTestData(wrong);
        reset();
        setNowModal('testing');
    }

    const reset = () => {
        setWrong([]);
        setCorrect([]);
        setCardNum(0);
    }

    const next = (prop:number):void => {
        prop === 0 ? setWrong([...wrong, testData[cardNum]]) : setCorrect([...correct, testData[cardNum]]);
        if(!isFront) setIsFront(true);
        if((cardNum+1) === testData.length) {
            setNowModal('end');
            return
        }
        setCardNum(cardNum+1);
    }
    console.log(data);

    const reverseCard = () => {
        setCheck(['english', 'japanese', 'memo'].filter(ch => !check.includes(ch)));
        setIsFront(!isFront);
    }

    const oneMoreEverything = () => {
        setWrong([]);
        setNowModal('start');
    }

    const postInfo = async (): Promise<void> => {
        //updateLoading(true);
        //ipアドレス
        const ip = IP+'wrong';
        try {
            const params = {
                data: wrong
            }
            await axios.post(ip,params);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            //updateLoading(false);
        }
        updateModal(false);
    }
    return(
        <>
        <SC.WrapperInitial toggle={nowModal.includes(`start`)}>
            <SC.FirstTitle>CHOOSE FRONT</SC.FirstTitle>
            <SC.FirstChoices>
                <SC.WrapperEn>
                    <Checkbox {...label} sx={{ '& .MWuiSvgIcon-root': { fontSize: 28 } }}
                        value={'english'}
                        onChange={setWords}
                    />English
                </SC.WrapperEn>
                <SC.WrapperJp>
                    <Checkbox {...label} sx={{ '& .MWuiSvgIcon-root': { fontSize: 36 } }}
                        value={'japanese'}
                        onChange={setWords}
                    />Japanese
                </SC.WrapperJp>
                <SC.WrapperMm>
                    <Checkbox {...label} sx={{ '& .MWuiSvgIcon-root': { fontSize: 28 } }}
                        value={'memo'}
                        onChange={setWords}
                    />Memo
                </SC.WrapperMm>
            </SC.FirstChoices>
            <SC.FirstButton>
                <Button  className="first-button-size" variant="outlined" onClick={() => updateModal(false)}>CLOSE</Button>
                <Button className="first-button-size" variant="outlined" onClick={toTesting}>NEXT</Button>
            </SC.FirstButton>
        </SC.WrapperInitial>

        <SC.Wrapper toggle={nowModal.includes(`testing`)}>
            <SC.SecondTitle>
                <Button variant="outlined" className="close-button" onClick={() => updateModal(false)}>✕</Button>
                <Button variant="outlined" className="close-button" onClick={reverseCard}>{isFront ? 'BACK' : 'FRONT'}</Button>
                <Button variant="outlined" className="close-button">{cardNum+1}/{testData.length}</Button>
            </SC.SecondTitle>
            <SC.SecondChoices>
                <SC.SecondEn toggle={check.includes(`english`)}>
                    {testData[cardNum]?.english}
                </SC.SecondEn>
                <SC.SecondJp toggle={check.includes(`japanese`)}>
                    {testData[cardNum]?.japanese}
                </SC.SecondJp>
                <SC.SecondMm toggle={check.includes(`memo`)}>
                    { testData[cardNum]?.memo}
                </SC.SecondMm>
            </SC.SecondChoices>
            <SC.FirstButton>
                <Button  variant="contained" color="error" className="close-button" onClick={() => next(0)}>✕</Button>
                <Button variant="contained" color="info" className="close-button" onClick={() => next(1)}>〇</Button>
            </SC.FirstButton>
        </SC.Wrapper>

        <SC.Wrapper toggle={nowModal.includes(`end`)}>
            <SC.Answer>
                <SC.WrapperJp>Correct:{correct.length}</SC.WrapperJp>
                <SC.WrapperMm>Wrong:{wrong.length}</SC.WrapperMm>
            </SC.Answer>
            <SC.WrapperAnswerButton>
                <SC.UpButton>
                    <Button  variant="contained" color="info" onClick={oneMoreEverything}>ALL WORDS</Button>
                    <Button  variant="contained" color="success" onClick={postInfo}>SAVE WRONG</Button>
                </SC.UpButton>
                <SC.UpButton>
                    <Button variant="contained" color="warning" onClick={() => updateModal(false)}>END CARDS</Button>
                    { wrong.length !== 0 ? <Button variant="contained" color="error" onClick={() => setNowModal('start')} >ONLY WRONG</Button> : <div></div> }
                </SC.UpButton>
            </SC.WrapperAnswerButton>
        </SC.Wrapper>
        </>
    )
}
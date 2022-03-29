import '../App.css';
import {useState, useEffect, useCallback, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { RegisterWord } from '../components/registerWord';
import { OpenSearch } from '../components/openSearch';
import { SearchWords } from '../components/searchWords';
import { MenuBar } from '../components/menuBar';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxForm } from '../components/checkBoxForm';
import Modal from 'react-modal';
import { EditModal } from '../components/editModal';
import { AllData } from '../App';
import { useGetData } from 'custom hooks/useGetData';
import Button from '@mui/material/Button';
import { getArrayData } from 'methods/getArrayData';
//css
import Wrapper from '../styled-components/Wrapper'
import Header from '../styled-components/Header'
import Title from '../styled-components/Title'
import WordTable from '../styled-components/WordTable';
import WrapperInput from 'styled-components/WrapperInput';
import WrapperTable from 'styled-components/WrapperTable';
import WrapperSearch from 'styled-components/WrapperSearch';

export const IP = 'https://vocabook-back.herokuapp.com/';

export type getData = {
    id: string,
    english: string,
    japanese: string,
    memo: string,
    sound?: null | string,
    index?:any
}

export const VocaBook = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [showCard, setShowCard] = useState<string>('');
    const [check, setCheck] = useState<string[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [deleteWord, setDeleteWord] = useState<boolean>(false);
    const [wrongFlg, setWrongFlg] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<getData[]>([]);
    const [editId, setEditId] = useState<any>();

    const {data, setData} = useContext(AllData);


    const updateLoading = useCallback((prop:boolean):void => setIsLoading(prop),[]);
    const updateToggle = useCallback((prop:boolean):void => setToggle(prop),[]);
    const updateData = useCallback((props:any):void => setData(props),[]);
    const updateCard = useCallback((prop:string):void => setShowCard(prop),[]);
    const updateEdit = useCallback((prop:boolean):void => setEdit(prop),[]);
    const updateDelete = useCallback((prop:boolean):void => setDeleteWord(prop),[]);
    const updateEditModal = useCallback((prop:boolean):void => setModal(prop),[]);
    const updateWrongFlg = useCallback((prop:boolean):void => setWrongFlg(prop),[]);

    useEffect((reload:boolean = false) => {
        const getData = async() => {
            const[ getAllData, isLoading ] = await getArrayData();
            setData(getAllData);
            setIsLoading(isLoading);
        }
        getData();
    },[])
    console.log(data);

    const setWords = useCallback((dt: getData) => {
        const valueId = dt.id;
        console.log(valueId);
        console.log(dt);
        // typeof e === 'string' ? id = e : id = Number(e.target.value);
        if(check.includes(valueId)){
            setCheck(check.filter((ch:string) => ch !== valueId));
            setSelectedData( prev => prev.filter(pr=> pr.id !== valueId));
        }else {
            setCheck([...check, valueId]);
            setSelectedData((prev) => [...prev, dt]);
        }
    },[]);


    const onEdit = (dt:object) => {
        console.log(dt);
        setEditId(dt)
        setModal(true);
    }

    const onDelete = (id:string) => {
        postDeleteInfo(id);
        setWrongFlg(false);
    }

    const postDeleteInfo = async(id:string) => {
        const wrong = wrongFlg ? true : undefined;
        const params = {
        id: id,
        wrong
        }
        const ip_delete = IP+'delete';
        //TODO:isLoadingの処理必要
        if(isLoading) return;
        updateLoading(true);
        try {
            const data = await axios.post(ip_delete,params);
            console.log(data.data);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            updateLoading(false);
        }
        wrongFlg ? setData(await getArrayData('wrong')) : setData(await getArrayData());
        setDeleteWord(false);
    }


    const colorTd = (id:number):(string | undefined) => {
        if(id%2 !== 0) return "td-color";
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
        {isLoading || <h1>Loading</h1> }

        {isLoading &&
        <Wrapper>
            <Header>
                <MenuBar
                    updateCard={updateCard}
                    updateEdit={updateEdit}
                    updateDelete={updateDelete}
                    updateWrongFlg={updateWrongFlg}
                ></MenuBar>
                <Title>VOCA BOOK</Title>
                <OpenSearch toggle={toggle} updateToggle={updateToggle}></OpenSearch>
            </Header>
            <WordTable>
                <WrapperInput>
                {
                    showCard.includes('card') ?
                    <CheckBoxForm
                        setWords={setWords}
                        selectedData={selectedData}
                        setSelectedData={setSelectedData}
                        check={check}
                    />
                    :<RegisterWord />
                }
                </WrapperInput>
                <WrapperSearch toggle={toggle}>
                    <SearchWords />
                </WrapperSearch>
                <WrapperTable>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={`padding ${showCard!=='' ? '' : 'none'}`} align="left"></TableCell>
                                <TableCell className={`padding ${edit ? '' : 'none'}`} align="left"></TableCell>
                                <TableCell className={`padding ${deleteWord ? '' : 'none'}`} align="left"></TableCell>
                                <TableCell className="padding" align="left">No.</TableCell>
                                <TableCell className="padding" align="left">English</TableCell>
                                <TableCell className="padding" align="left">日本語</TableCell>
                                <TableCell className="padding" align="left">メモ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {data?.map((dt:getData,index:number) =>
                                <TableRow  key={dt.id} className={colorTd(index)}>
                                    <TableCell className={` padding ${showCard!=='' ? '' : 'none'}`} align="center">
                                        <Checkbox {...label} sx={{ '& .MWuiSvgIcon-root': { fontSize: 28 } }}
                                        value={dt.id}
                                        onChange={()=> setWords(dt)}
                                        />
                                    </TableCell>
                                    <TableCell className={`padding ${edit ? '' : 'none'}`} align="left">
                                        <Button className="side-margin" variant="outlined" onClick={() => onEdit(dt)}>EDIT</Button>
                                    </TableCell >
                                    <TableCell className={`padding ${deleteWord ? '' : 'none'}`} align="left">
                                        <Button className="side-margin" variant="outlined" onClick={() =>  onDelete(dt.id)}>DELETE</Button>
                                    </TableCell >
                                    <TableCell className="padding" align="left">{dt.index}</TableCell >
                                    <TableCell className="padding" align="left">{dt.english}</TableCell >
                                    <TableCell className="padding" align="left">{dt.japanese}</TableCell >
                                    <TableCell className="padding" align="left">{dt.memo}</TableCell >
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal className="edit-modal" overlayClassName="overlay" isOpen={modal} >
                        <EditModal updateEditModal={updateEditModal} dt={editId} wrongFlg={wrongFlg} updateWrongFlg={updateWrongFlg}></EditModal>
                    </Modal>
                </WrapperTable>
            </WordTable>
        </Wrapper>
    }
</>
);
}
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React,{FC, useState, memo, useContext, VoidFunctionComponent} from 'react';
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import '../App.css';
import {useGetData} from '../custom hooks/useGetData';
import {AllData} from '../App'
import {getArrayData} from '../methods/getArrayData'
import _ from 'lodash';


type Props = {
  updateCard: (prop: string) => void,
  updateEdit: (prop: boolean) => void,
  updateDelete: (prop: boolean) => void,
  updateWrongFlg:(prop: boolean) => void,
  ex?:() => void
}
export const MenuBar:FC<Props> = React.memo((props:Props) => {

  console.log('menubar');

  const {updateCard, updateEdit, updateDelete, updateWrongFlg} = props;
  const {setData} = useContext(AllData);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [boo,setBoo] = useState(false);
  const handle = () => {
    setBoo(false || 10 >= 3);
    console.log(boo);
  }

  const updateEditNCardToFalse = () => {
    updateEdit(false);
    updateCard('');
  }

  const showCard = () => {
    updateEdit(false);
    updateDelete(false);
    updateCard('card');
  }
  const showDelete = () => {
    updateEditNCardToFalse();
    updateDelete(true);
  }
  const showEdit = () => {
    updateEditNCardToFalse();
    updateDelete(false);
    updateEdit(true);
  }
  const allWords = async() => {
    updateDelete(false);
    updateEditNCardToFalse();
    //すでに全単語だったら無駄な通信しない
    const[ getAllData, isLoading ] = await getArrayData();
    setData(getAllData);
  }
  const allWrongWords = async() => {
    updateEditNCardToFalse();
    setData(await getArrayData('wrong'));
    updateWrongFlg(true);
  }

    return(
      <>
        <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        href="#outlined-buttons"
        >
          <ListIcon  className="margin-top black" fontSize="large" ></ListIcon>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={showCard}>フラッシュカード</MenuItem>
          <MenuItem onClick={allWrongWords}>間違った単語</MenuItem>
          <MenuItem onClick={allWords}>全単語</MenuItem>
          <MenuItem onClick={handleClose}>一括登録</MenuItem>
          <MenuItem onClick={showEdit}>編集</MenuItem>
          <MenuItem onClick={showDelete}>削除</MenuItem>
        </Menu>
      </>
    )
})
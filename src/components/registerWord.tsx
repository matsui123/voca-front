import { VFC, memo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { usePostData } from '../custom hooks/usePostData';

export const RegisterWord:VFC = memo(() => {

    console.log(`register word`);

    const [{en, jp, memo},{handleEn, handleJp, handleMemo, handleRegister}] = usePostData();
    return(
        <>
            <TextField className="side-margin" id="standard-basic" label="English" variant="standard"  value={en} onChange={handleEn}/>
            <TextField className="side-margin" id="standard-basic" label="日本語" variant="standard"  value={jp} onChange={handleJp}/>
            <TextField className="side-margin" id="standard-basic" label="メモ" variant="standard"  value={memo} onChange={handleMemo}/>
            <Button className="side-margin" variant="outlined"  href="#outlined-buttons" onClick={handleRegister}>登録</Button>
        </>
    )
})
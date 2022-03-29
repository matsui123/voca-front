import TextField from '@mui/material/TextField';
import {VFC, memo} from 'react';
import { useSearch } from 'custom hooks/useSearch';

export const SearchWords:VFC = memo(() => {
    console.log('searchWords');
    const [search, onSearch] = useSearch();

    return(
        <TextField id="standard-basic" className='width-full'
        label="検索" variant="standard"
        value={search} onChange={ onSearch } />
    )
});
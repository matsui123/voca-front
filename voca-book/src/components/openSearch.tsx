import {FC, memo, useCallback} from 'react';
import Button from '@mui/material/Button';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

type Props = {
    toggle: boolean,
    updateToggle: (props:boolean) => void
}

export const OpenSearch:FC<Props> = memo(({toggle, updateToggle}) => {
    const onToggle = useCallback(() => updateToggle(!toggle),[toggle]);
    console.log('openSearch');

    return(
        <Button variant="outlined" href="#outlined-buttons" onClick={onToggle}>
            <ManageSearchIcon className="margin-top" fontSize="large"></ManageSearchIcon>
        </Button>
    )
})
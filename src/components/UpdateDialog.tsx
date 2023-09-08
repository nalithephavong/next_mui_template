import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem
} from '@mui/material';
import { StatusType } from '@/templates/Interfaces';

interface UpdateDialogProps {
    selected: string[];
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    statusOpts: StatusType[];
}

export default function UpdateDialog(props:UpdateDialogProps) {
    const { selected, showDialog, setShowDialog, callbackFn, title, description, statusOpts } = props;
    const [status, setStatus] = useState(statusOpts[0].id);

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleAdd = () => {
        callbackFn( { 
            data: { status: status }, 
            selected 
        }
        );
        setShowDialog(false);
    };

    const handleStatusChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description} {selected.join(", ")}?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        select
                        margin="dense"
                        id="status"
                        label="Status"
                        fullWidth
                        variant="standard"
                        onChange={handleStatusChange}
                        value={status}
                    >
                        {statusOpts.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} autoFocus>Update</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

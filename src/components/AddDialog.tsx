import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

interface AddDialogProps {
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
    callbackFn: (value:unknown) => void;
    title: string;
    description: string;
    fields: {id: string, label: string, type: string}[];
}

type DataType = {
    [key:string]: string;
}

export default function AddDialog(props:AddDialogProps) {
    const { showDialog, setShowDialog, callbackFn, title, description, fields } = props;
    const [data, setData] = useState<DataType>({});

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleAdd = () => {
        callbackFn(data);
        setShowDialog(false);
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let id = event.target.id;
        let newValue = event.target.value;
        let newData = data;
        newData[id] = newValue;
        setData(newData);
    };

    return (
        <div>
            <Dialog open={showDialog} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {
                        fields.map((field) => {
                            return (
                                <TextField
                                    key={field.id}
                                    autoFocus
                                    margin="dense"
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            );
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} autoFocus>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

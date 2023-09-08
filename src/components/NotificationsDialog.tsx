import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

interface NotificationsDialogProps {
    notifications: string[];
    showDialog: boolean;
    setShowDialog: (value:boolean) => void;
}

const formatText = (text: string[]) => {
    if (text.length === 0) return "Yay! No notifications to display."

    let items: JSX.Element[] = [];
    text.forEach((line, index) => {
        items.push(<p key={index}>{line}</p>);
    });
    return <>{items}</>;
};

export default function NotificationsDialog(props:NotificationsDialogProps) {
    const { notifications, showDialog, setShowDialog } = props;

    const handleClose = () => {
        setShowDialog(false);
    };

    return (
        <div>
            <Dialog
                open={showDialog}
                onClose={handleClose}
                aria-labelledby="notify-dialog-title"
                aria-describedby="notify-dialog-description"
            >
                <DialogTitle id="notify-dialog-title">
                    Notifications
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="notify-dialog-description" component="span">
                    {formatText(notifications)}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

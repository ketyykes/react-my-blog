import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, IconButton, Skeleton, useMediaQuery } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import * as styles from "./imageDialogs.module.scss";

export default function ImageDialogs({ cardItemObject }) {
    const { card_image } = styles;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const [loaded, setLoaded] = useState(false);
    const loadEventHandler = () => {
        setLoaded(true);
        console.log('test');
    }
    const handleClose = () => {
        setOpen(false);
    };
    const minWidthBoolean = useMediaQuery('(min-width:576px)');
    const CustomDialog = styled(Dialog)({
        '.MuiDialogTitle-root': {
            textAlign: 'center',
        },
        '.MuiDialogContent-root img': {
            width: '100%'
        },
        '.MuiPaper-root': {
            borderRadius: '16px'
        }
    });

    return (
        <>
            <div className={card_image} >
                <img style={{ display: loaded ? 'block' : 'none' }} src={cardItemObject.cardImageSrc} alt={cardItemObject.cardHead} onLoad={loadEventHandler} />
                {loaded ? "" : (<Skeleton variant="rectangular" sx={{ width: "100%", height: "100px" }} />)}
                {minWidthBoolean ? (<Button onClick={handleClickOpen} >
                    <ZoomOutMapIcon />
                </Button>) : null
                }
            </div>
            <CustomDialog fullWidth={true}
                maxWidth={"xl"} onClose={handleClose} open={open} >
                <DialogTitle>
                    {cardItemObject.cardHead}
                    {open ? (
                        <IconButton aria-label="close" onClick={handleClose} sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent dividers >
                    {<img alt={cardItemObject.cardHead} src={cardItemObject.cardImageSrc} />}
                </DialogContent>
            </CustomDialog>
        </>
    );
}

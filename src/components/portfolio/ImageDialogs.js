import React, { useState, useRef, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Skeleton,
	useMediaQuery,
	Zoom,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { cardImage } from "./imageDialogs.module.scss";

export default function ImageDialogs({ cardItemObject }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const imageRef = useRef(null);

	useEffect(() => {
		if (imageRef?.current?.complete) {
			setLoading(false);
		}
	}, []);
	const loadEventHandler = (e) => {
		if (e.target.complete === true) {
			setLoading(false);
		}
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Zoom ref={ref} {...props} />;
	});

	const minWidthBoolean = useMediaQuery("(min-width:600px)");
	const CustomDialog = styled(Dialog)({
		".MuiDialogTitle-root": {
			textAlign: "center",
		},
		".MuiDialogContent-root img": {
			width: "100%",
		},
		".MuiPaper-root": {
			borderRadius: "16px",
		},
	});
	return (
		<>
			<div className={cardImage}>
				<img
					ref={imageRef}
					decoding="async"
					style={{ display: loading ? "none" : "block" }}
					src={cardItemObject.cardImageSrc}
					alt={cardItemObject.cardHead}
					onLoad={loadEventHandler}
				/>
				{loading && (
					<Skeleton
						variant="rectangular"
						sx={{ width: "100%", height: "140px" }}
					/>
				)}
				{minWidthBoolean ? (
					<Button onClick={handleClickOpen}>
						<ZoomOutMapIcon />
					</Button>
				) : null}
			</div>
			<CustomDialog
				fullWidth={true}
				maxWidth={"xl"}
				onClose={handleClose}
				keepMounted
				open={open}
				TransitionComponent={Transition}
			>
				<DialogTitle>
					{cardItemObject.cardHead}
					{open ? (
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: "absolute",
								right: 8,
								top: 8,
							}}
						>
							<CloseIcon />
						</IconButton>
					) : null}
				</DialogTitle>
				<DialogContent dividers>
					{
						<img
							alt={cardItemObject.cardHead}
							src={cardItemObject.cardImageSrc}
						/>
					}
				</DialogContent>
			</CustomDialog>
		</>
	);
}

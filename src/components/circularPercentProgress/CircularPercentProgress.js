import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const CircularPercentProgress = (props) => {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress variant="determinate" {...props} size={100} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
					sx={{ fontSize: "1.5rem" }}
				>
					{Math.round(props.value)}%
				</Typography>
			</Box>
		</Box>
	);
};

export default CircularPercentProgress;

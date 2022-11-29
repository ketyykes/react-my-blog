import React from "react";
import {
	Card,
	Grid,
	CardContent,
	CardHeader,
	Typography,
	useMediaQuery,
} from "@mui/material";
import ImageDialogs from "./ImageDialogs";

const PortfolioTabPanel = ({ index, value, data }) => {
	const isMobile = useMediaQuery(" ( width < 576px ) ");
	return (
		<div>
			{value === index && (
				<Grid container spacing={2} sx={{ justifyContent: "center" }}>
					{data.map((cardItemObject, index) => (
						<Grid item xs={12} lg={4} xl={3} md={6} sm={6} key={index}>
							<Card
								sx={{
									borderRadius: "20px",
									mt: 2,
									minHeight: isMobile ? null : "500px",
								}}
							>
								<CardHeader
									title={cardItemObject.cardHead}
									sx={{ textAlign: "center" }}
								></CardHeader>
								<CardContent>
									<ImageDialogs cardItemObject={cardItemObject} />
									<Typography variant="body1" sx={{ mt: 2 }}>
										{cardItemObject.cardContent}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</div>
	);
};

export default PortfolioTabPanel;

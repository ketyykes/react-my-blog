import React, { useState } from "react";
import { Tabs, Tab, styled } from "@mui/material/";
import PortfolioTabPanel from "./PortfolioTabPanel";
import { graphql, useStaticQuery } from "gatsby";
const CustomTabs = styled(Tabs)({
	".MuiTabs-flexContainer": {
		justifyContent: "center",
	},
});
const PortfolioTab = () => {
	const handleTabs = (e, val) => {
		setValue(val);
	};
	//query json 資料夾裡面的 json
	const data = useStaticQuery(graphql`
		{
			jsonJson {
				backEndCardArray {
					cardHead
					cardContent
					cardImageSrc
					webSrc
				}
				frontEndCardArray {
					cardContent
					cardHead
					cardImageSrc
					webSrc
				}
				otherCardArray {
					cardContent
					cardHead
					cardImageSrc
					webSrc
				}
			}
		}
	`);
	//解構再解構
	const {
		jsonJson: { frontEndCardArray, backEndCardArray, otherCardArray },
	} = data;
	const [value, setValue] = useState(0);
	return (
		<>
			<CustomTabs value={value} onChange={handleTabs}>
				<Tab label="Front-end"></Tab>
				<Tab label="Backend"></Tab>
				<Tab label="Other"></Tab>
			</CustomTabs>
			<PortfolioTabPanel value={value} index={0} data={frontEndCardArray} />
			<PortfolioTabPanel value={value} index={1} data={backEndCardArray} />
			<PortfolioTabPanel value={value} index={2} data={otherCardArray} />
		</>
	);
};
export default PortfolioTab;

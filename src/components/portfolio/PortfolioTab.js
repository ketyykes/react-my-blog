import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import PortfolioTabPanel from './PortfolioTabPanel';
import { styled } from '@mui/material/styles';
import { graphql, useStaticQuery } from "gatsby";
const CustomTabs = styled(Tabs)({
  '.MuiTabs-flexContainer': {
    justifyContent: 'center'
  }
});
const PortfolioTab = () => {
  const handleTabs = (e, val) => {
    setValue(val);
  }
  //query json資料夾裡面的json
  const data = useStaticQuery(graphql`
    {
        jsonJson {
          backEndCardArray {
            cardHead
            cardContent
            cardImageSrc
          }
          frontEndCardArray {
            cardContent
            cardHead
            cardImageSrc
          }
          otherCardArray{
            cardContent
            cardHead
            cardImageSrc
          }
        }
      }
  `);
  //解構再解構
  const { jsonJson: { frontEndCardArray, backEndCardArray, otherCardArray } } = data;
  const [value, setValue] = useState(0)
  return (
    <Container maxWidth="xl">
      <CustomTabs value={value} onChange={handleTabs} >
        <Tab label="Front-end"></Tab>
        <Tab label="Backend"></Tab>
        <Tab label="Other"></Tab>
      </CustomTabs>
      <PortfolioTabPanel value={value} index={0} data={frontEndCardArray}></PortfolioTabPanel>
      <PortfolioTabPanel value={value} index={1} data={backEndCardArray}></PortfolioTabPanel>
      <PortfolioTabPanel value={value} index={2} data={otherCardArray}></PortfolioTabPanel>
    </Container>
  )
}
export default PortfolioTab
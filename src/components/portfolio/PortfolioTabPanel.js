import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import * as styles from "./portfolioTabPanel.module.scss";
import { StaticImage, GatbyImage } from "gatsby-plugin-image";


const PortfolioTabPanel = ({ index, value, data }) => {
  const { card, card_content, whole_img } = styles;
  const [wholeImg, setWholeImage] = useState(false);
  const imageHandler = () => {
    setWholeImage(true);
    console.log("tst");
  }
  return (
    <div>{
      value === index && (
        <Grid container spacing={2}>
          {
            data.map((cardItemObject, index) => (
              <Grid item xs={12} lg={4} xl={3} md={6} key={index}>
                <Card className={card}>
                  <CardHeader title={cardItemObject.cardHead} >
                  </CardHeader>
                  <CardContent className={card_content}>
                    <img src={cardItemObject.cardImageSrc} className={whole_img} onClick={imageHandler} />
                    {cardItemObject.cardContent}
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      )
    }</div>
  )
}

export default PortfolioTabPanel
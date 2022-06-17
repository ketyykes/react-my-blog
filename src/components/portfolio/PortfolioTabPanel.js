import React, { useState } from 'react'
import { Card, Grid, CardContent, CardHeader, Typography } from '@mui/material';
import { StaticImage, GatbyImage } from "gatsby-plugin-image";
import ImageDialogs from './ImageDialogs';

const PortfolioTabPanel = ({ index, value, data }) => {
  return (
    <div>{
      value === index && (
        <Grid container spacing={2} sx={{justifyContent:"center"}}>
          {
            data.map((cardItemObject, index) => (
              <Grid item xs={12} lg={4} xl={3} md={6} key={index} >
                <Card sx={{ borderRadius: "20px", mt: 2 }}>
                  <CardHeader title={cardItemObject.cardHead} sx={{ textAlign: 'center' }} >
                  </CardHeader>
                  <CardContent >
                    <ImageDialogs cardItemObject={cardItemObject} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {cardItemObject.cardContent}
                    </Typography>
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
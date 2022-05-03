import React from 'react'
import {graphql} from 'gatsby'
import Layout from "../components/Layout";
const Index = ({data}) => {
    // console.log(data);
    const {title,description} = data.site.siteMetadata
    return (
        <>
            <Layout/>
            <p>{title}:{description}</p>
        </>
    )
}
export default Index;
export const query = graphql`query MyQuery {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
  }`
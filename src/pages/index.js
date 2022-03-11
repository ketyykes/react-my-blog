import React from 'react'
import {graphql} from 'gatsby'
const Index = ({data}) => {
    // console.log(data);
    const {title,description} = data.site.siteMetadata
    return (
        <>
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
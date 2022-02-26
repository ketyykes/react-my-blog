import React from 'react'
import {graphql} from 'gatsby'
const index = ({data}) => {
    console.log(data);
    const {title,description} = data.site.siteMetadata
    return (
        <div>
            <p>{title}:{description}</p>
        </div>
    )
}
export default index
export const query = graphql`query MyQuery {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
  }`
import React from 'react'
import Layout from '../components/layout/Layout'
import { articleContent } from "../styles/templates-styles/article-template.module.scss";
const dayjs = require('dayjs')
// import {graphql} from 'gatsby'
const articleTemplate = ({ pageContext }) => {
  // console.log(data);
  const { html, title, date } = pageContext;
  const fomateDate = dayjs(date).format('YYYY-MM-DD ddd');
  // const {title} = frontmatter;
  // console.log(pageContext);
  return (
    <Layout>
      <div className={articleContent}>
        <h2>{title}</h2>
        <h3>{fomateDate}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default articleTemplate;

// export const query = graphql`
// query articleTechQuery {
//   allMarkdownRemark {
//       nodes {
//         html
//         id
//         frontmatter {
//           title
//         }
//       }
//     }
// }
// `








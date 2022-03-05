import React from 'react'
import Layout from '../components/Layout'
import * as styles from "../styles/article-template.module.scss";
import {graphql} from 'gatsby'
const articleTemplate = ({data,pageContext}) => {
  console.log(data)
  console.log(pageContext);
    const { articleContent} = styles;
    const {html} = data.markdownRemark;
  return (
    <Layout>
        <div className={articleContent}>
            <h2>title</h2>
            <h3>stack</h3>
            <div dangerouslySetInnerHTML={{__html:html}}/>
        </div>
    </Layout>
  )
}

export default  articleTemplate;

export const query = graphql`
query ProjectTemplate($slug: String) {
  markdownRemark(frontmatter: {slug: {eq: $slug}}) {
    html
    frontmatter {
      stack
      title
    }
  }
}
`








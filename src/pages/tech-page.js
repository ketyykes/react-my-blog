import React from 'react'
import Layout from '../components/Layout'
import {graphql,Link} from 'gatsby'

const techPage = ({data}) => {

    // console.log(data.allMarkdownRemark.nodes);
    const markdownArticle = data.allMarkdownRemark.nodes;
    return (
      <>
        <Layout>
          <div>
            {markdownArticle.map(article =>(
              <Link to={"/tech-page/"+article.id} key={article.id}>
                <div>
                  <h3>{article.frontmatter.title}</h3>
                  <p>{article.frontmatter.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </Layout>
      </>
    )
}

export default techPage;

export const query = graphql`
query listArticleQuery {
  allMarkdownRemark {
    nodes {
      frontmatter {
        title
        date
      }
      id
    }
  }
}`



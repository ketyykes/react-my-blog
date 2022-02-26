import React from 'react'
import '../styles/global.scss'
import Footer from './Footer'
import Banner from './Banner'
import {graphql, useStaticQuery} from 'gatsby'

const Layout = ({children}) => {
    const data = useStaticQuery(graphql`{
        site {
          siteMetadata {
            description
            title
          }
        }
      }`)
    console.log(data);
    return (
        <header >
            <Banner />
            {children}
            <Footer />
        </header>
    )
}

export default Layout

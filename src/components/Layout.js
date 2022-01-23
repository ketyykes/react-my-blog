import React from 'react'
import '../styles/global.scss'
import Footer from './Footer'
import Banner from './Banner'

const Layout = ({children}) => {
    return (
        <header className="container-xxl">
            <Banner />
            {children}
            <Footer />
        </header>
    )
}

export default Layout

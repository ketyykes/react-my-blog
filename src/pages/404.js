import React from 'react'
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { not_found } from "../styles/pages-styles/notfound.module.scss"

const NotFound = () => {
    return (
        <>
            <Header />
            <div className={not_found}>
                <h2 >404抱歉你輸入的頁面無法被找到</h2>
            </div>
            <Footer />
        </>
    )
}

export default NotFound

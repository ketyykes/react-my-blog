import React from 'react'

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            style={{ display: "block" }}
            onClick={onClick}
        />

    )
}

export default NextArrow
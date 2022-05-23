import React from 'react'

const PreArrow = (props) => {
    const {onClick } = props;
    return (
        <div
            style={{ display: "none" }}
            onClick={onClick}
        />
    )
}

export default PreArrow
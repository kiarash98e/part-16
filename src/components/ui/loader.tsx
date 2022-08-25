import React from 'react'
import styled from 'styled-components'

const DivLoad = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e7d5c0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .custom-loader {
        border: 3px solid #f1f1f1;
        border-top: 3px solid #00d1b266;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const loader:React.FC = () => {
    return(
        <DivLoad>
            <div className="custom-loader"></div>
        </DivLoad>
    )
}
export default loader
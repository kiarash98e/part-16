import React from 'react';
import styled from 'styled-components'


const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    color: #E0EFEA;
    background-color: #624432;
    font-size: 20px;
    outline: none;
    &:hover{
        background-color: #b77d5c; 
        outline: none;
    }
`
const Btn:React.FC<any> = ({text, onClick, disabled, className}) => {
    return(
        <Button className={className} onClick={onClick} disabled={disabled}>{text}</Button>
    )
}
export default Btn
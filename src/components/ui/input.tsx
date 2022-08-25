import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
const Div = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 7px;
    padding-bottom: 7px;
    label{
        padding-top: 10px;
        padding-bottom: 10px;
        text-transform: capitalize;
    }
`
const Input = styled.input`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    outline: none;
    &::placeholder{
        padding-left: 5px;
        color: #985;
    }
    &:focus{
        outline: none !important;
    }
    
`
const Inp:React.FC<InputProps> = ({type="text",placeholder,onChange,label,value,name}) => {
    return(
        <Div>
            <label htmlFor={name} >{label}</label>
            <Input placeholder={placeholder} type={type} onChange={onChange} value={value} name={name} id={name}/>
        </Div>    
    )
}
export default Inp
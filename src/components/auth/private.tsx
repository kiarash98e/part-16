import React from 'react'
import { Navigate } from 'react-router-dom'



const Private:React.FC<any> = ({children,auth}) => {
  
    
    if (auth) {
        return children
    }

    return <Navigate to={"/"} replace/>       
}

export default Private
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../redux/selector/useUser'
import Msg from '../ui/msg'
import Button from '../ui/button'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .user{
    color: #ffc8dd;
  }
`

const Dashboard:React.FC<any> = () => {

    
    const { userState, setSuccessMsg, signout } = useUser()
    const { success, needVerification, user } = userState


    useEffect(() => {
        return () => {
          
          if(success) {
            setSuccessMsg('')
          }
        }
      }, [setSuccessMsg, success])
    
      const navigate = useNavigate()
      const handleLogout = () => {
        signout()
        navigate("/")

      }
      
      
    return(
        <>
           <Section>
              <div className="container">
                {needVerification && <Msg type="success" msg="Please verify your email address." />}
                <h1 className="user">Welcome {user?.email}</h1>
                <Button onClick={handleLogout} text="logout"/>
              </div>
            </Section>  
        </>
    )
}

export default Dashboard
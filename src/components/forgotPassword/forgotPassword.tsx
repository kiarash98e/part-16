import React, { FormEvent, useEffect } from 'react'
import styled from 'styled-components'
import useUser from '../../redux/selector/useUser'
import Button from '../ui/button'
import Input from '../ui/input'
import Msg from '../ui/msg'



const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  @media only screen and (max-width:568px) {
    width: 100%;
  }
  min-width: 450px;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  background: linear-gradient(to bottom,#E0EFEA,#8EA076);
  h2{
    text-align: center;
    color: #558a74;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
`

const Form = styled.form`
  width: 100%;
  height: 100%;
  text-decoration: none !important;
`

const ForgotPassword:React.FC = () => {

    const [email,setEmail] = React.useState("")
    const [loading,setLoading] = React.useState(false)

    const { userState, setErrorIn, sendPassResetEmail, setSuccessMsg } = useUser()
    const { error, success } = userState


    useEffect(() => {
        return () => {
          if(error) {
            setErrorIn('')
          }
          if(success) {
            setSuccessMsg('')
          }
        }
      }, [error, setErrorIn, setSuccessMsg, success])
    
      const submitHandler = async(e: FormEvent) => {
        e.preventDefault();
        if(error) {
         setErrorIn('')
        }
        if(success) {
          setSuccessMsg('')
        }
        setLoading(true)
        await sendPassResetEmail(email,"sent Email !!!")
        setLoading(false)
      }

    return(
        <>
            <FormContainer>
                <Container>
                  <h2>Reset Password</h2>
                  <Form onSubmit={submitHandler}>
                      {error && <Msg type='danger' msg={error}/>}
                      {success && <Msg type='success' msg={success}/>}
                      <Input placeholder='enter email ...' label='email' type={"text"} name={"email"} value={email} onChange={(e:any) => setEmail(e.target.value)} />
                      
                      <Button text={loading ? "loading...":"send reset password"} disabled={loading}/>
                  </Form>
                </Container>
            </FormContainer>
        </>
    )
}

export default ForgotPassword
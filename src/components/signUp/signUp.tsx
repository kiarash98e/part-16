import React, { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useUser from '../../redux/selector/useUser'
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
  .forgot{
    color: #977744;
    padding-left: 5px;
    padding-top: 20px;
  }
  .btn{
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
`

const Form = styled.form`
  width: 100%;
  height: 100%;
  text-decoration: none !important;
    .btn-login{
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
      margin-top: 22px;
  }
  .btn-login:disabled{
    cursor: not-allowed;
  }
`

const SignUp:React.FC = () => {

    const [email,setEmail] = React.useState("")
    const [displayName,setDisplayName] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [loading,setLoading] = React.useState(false)

    const { userState, setErrorIn, signUp } = useUser()
    const { error } = userState
    const navigate = useNavigate()
    

    useEffect(() => {
        return () => {
          if(error) {
            setErrorIn('')
          }
        }
      }, [error, setErrorIn])
    
      const submitHandler = async(e: FormEvent) => {
        e.preventDefault();
        if(error) {
         setErrorIn('')
        }
        setLoading(true);
        await signUp({displayName,email,password},() => setLoading(false))
        setTimeout(() => {
          navigate("/dashboard")
        }, 500)
      }

      
    return(
        <>
            <FormContainer>
              <Container>
                <h2>sign Up</h2>
                <Form onSubmit={submitHandler}>
                    {error && <Msg type='danger' msg={error}/>}
                    <Input 
                          name="firstName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="First name"
                          label="First name"
                        />
                        <Input placeholder='enter email ...' label='email' type={"text"} name={"email"} value={email} onChange={(e:any) => setEmail(e.target.value)} />
                        <Input placeholder='enter password ...' label='password' type={"password"} name={"password"} value={password} onChange={(e:any) => setPassword(e.target.value)} />
                    <button className='btn-login' disabled={loading}>{loading ? "loading...":"sign up"}</button>
                    
                </Form>
              </Container>
            </FormContainer>
        </>
    )
}

export default SignUp
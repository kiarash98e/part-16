import React, { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useUser from '../../redux/selector/useUser'
import Button from '../ui/button'
import Input from '../ui/input'
import Msg from '../ui/msg'
import { IoLogoGoogle } from 'react-icons/io5'



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
  .other-login{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    .btn-login{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      background-color: #E0EFEA;
      color: #624432;
      font-size: 20px;
      outline: none;
      .logo{
        margin-right: 10px;
      }
    }
    .btn-signup{
      display: flex;
      margin-left: 20px;
      width: 160px !important;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      background-color: #E0EFEA;
      color: #624432;
      font-size: 20px;
      outline: none;
    }
  }
`

const SignIn:React.FC = () => {

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [loading,setLoading] = React.useState(false)

    const navigate = useNavigate()
    const { userState, setErrorIn, signin, signInGoogle } = useUser()
    const { error } = userState

    useEffect(() => {
        return () => {
          if(error) {
            setErrorIn('')
          }
        }
      }, [error, setErrorIn])
    
      const submitHandler = async(e: FormEvent) => {
        e.preventDefault()
        if(error) {
          setErrorIn('')
        }
        setLoading(true)
        await signin({email,password},() => setLoading(false))
        
        setTimeout(() => {
          navigate("/dashboard")
        }, 500)
      }
      const handleGoogle = async() => {
        await signInGoogle()
        setTimeout(() => {
          navigate("/dashboard")
        }, 500)
      }
      return(
        <>
            <FormContainer>
              <Container>
                <h2>signIn</h2>
                <Form onSubmit={submitHandler}>
                    {error && <Msg type='danger' msg={error}/>}
                    <Input placeholder='enter email ...' label='email' type={"text"} name={"email"} value={email} onChange={(e:any) => setEmail(e.target.value)} />
                    <Input placeholder='enter password ...' label='password' type={"password"} name={"password"} value={password} onChange={(e:any) => setPassword(e.target.value)} />
                    <p onClick={() => navigate("/forgot-password")} className="forgot">Forgot Password ?</p>
                    <div className='btn'>
                      <Button text={loading ? "loading...":"sign in"} disabled={loading}/>
                    </div> 
                    <div className="other-login">
                      <button onClick={handleGoogle} className="btn-login"> <IoLogoGoogle size={20} className="logo"/> sign in with google</button>  
                      <button onClick={() => navigate('/signup')} className="btn-signup">sign Up</button>  
                    </div> 
                  </Form>
              </Container>
            </FormContainer>
        </>
    )
}

export default SignIn 
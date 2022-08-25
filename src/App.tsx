import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard'
import SignIn from './components/signIn/signIn'
import SignUp from './components/signUp/signUp'
import Forgot from './components/forgotPassword/forgotPassword'
import PrivateRoute from './components/auth/private'
import useUser from './redux/selector/useUser'
import Loader from './components/ui/loader'
import styled from 'styled-components'


const Header = styled.header`
  height: 7rem;
  width: 100%;
  background-color: #E0EFEA;
  color: #b77d5c;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App:React.FC = () => {


  const { userState } = useUser()
  const { loading  } = userState

 
  if(loading) {
    return <Loader />
  }

  const { authenticated } = userState

  return (
    <>
      <Router>
        <React.Fragment>
          <Header>
            <h4>react-ts-rtk-firebase-authentication</h4>
          </Header>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgot-password' element={<Forgot />} />
            <Route path='/dashboard' element={
              <PrivateRoute auth={authenticated}>
                <Dashboard/>
              </PrivateRoute>
            } />
          </Routes> 
        </React.Fragment>
      </Router>
    </>
  )
}

export default App

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { 
    login,
    logout,
    SignInData,
    SignUpData,
    needVerify,
    setError,
    setLoading,
    setSuccess,
    setAuthForm
    
} from '../reducer/userReducer'

import { signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut,   } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'
import { auth,provider } from '../../firebase/firebase.config'
const useUser = () => {
    const dispatch = useAppDispatch()
    const userState = useAppSelector((state) => state.user)

    const signUp = async (data:SignUpData,onError:() => void) => {
        try {
                const res = await createUserWithEmailAndPassword(auth,data.email, data.password);
                if(res.user) {
                  const userData:any = {
                    email: res.user.email,
                    displayName: res.user.displayName ?? res.user.email?.slice(0,8),
                    uid: res.user.uid,
                    createdAt: serverTimestamp()
                  } 
                dispatch(needVerify())
                if (!userState.needVerification) {
                    await sendEmailVerification(res!.user)
                }
                
               return dispatch(login(userData))
              }
        } catch (err:any) {
                onError()
                dispatch(setError(err?.message))
        }
    }
    

    const signInGoogle = async() => {
     const res =  await signInWithPopup(auth,provider) 
      return dispatch(login(res.user))
    }

    
    const setLoadingIn = (value: boolean) => {
        return dispatch(() => {
          setLoading(value)
        })
    }
    const signin = async(data: SignInData, onError: () => void) => {
        try {
             const res = await signInWithEmailAndPassword(auth,data.email, data.password)
             return dispatch(login(res.user))
          } catch (err:any) {
            onError()
            dispatch(setError(err.message))
          }
      }

      const signout = async() => {
        try {
            await signOut(auth)
            dispatch(setLoading(true))
            return dispatch(logout())
          } catch (err:any) {
            dispatch(setLoading(false))
          }
       
      }

      const setErrorIn = (msg: string) => {
        return dispatch(() => {
          setError(msg)
        })
      }

      const setAuthIn = React.useCallback(() => dispatch(setAuthForm()),[dispatch])

      const setNeedVerification = () => {
        return dispatch(() => {
            needVerify()
        })
      }

      const setSuccessMsg = (msg: string) => {
        return dispatch(() => {
          setSuccess(msg)
        })
      }

      const sendPassResetEmail = async(email: string, successMsg: string)  => {
        try {
            await sendPasswordResetEmail(auth,email)
            dispatch(setSuccess(successMsg))
          } catch (err:any) {
            dispatch(setError(err.message))
          }
      
      }

    return { 
        userState, 
        sendPassResetEmail,
        setNeedVerification,
        setSuccessMsg,
        sendEmailVerification,
        signout,
        signin,
        signUp,
        setErrorIn,
        setLoadingIn,
        signInGoogle,
        setAuthIn
    }
}

export default useUser
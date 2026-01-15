import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
     const { authUser ,isLoggedIn , login} = useAuthStore();
  return (
   <>
   <button >click me</button>
   
   </>
  )
}

export default LoginPage;
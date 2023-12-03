import React from 'react'
import LoginForm from './loginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

async function Login() {
  const session =await getServerSession();
  if(session){
    redirect("/")
  } 
  return (
    <LoginForm/>
  )
}

export default Login
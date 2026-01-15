import React from 'react'
import { useAuthStore } from '../store/useAuthStore';


const ChatPage = () => {
const { authUser ,isLoggedIn , login} = useAuthStore();

  return (
    <div>
      hello world
      <button> click me </button>
    </div>
  )
}

export default ChatPage;
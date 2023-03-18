import { useState } from 'react'
import './App.css'
import UserContext from './contexts/userContext'
import { LoginForm } from './components/LoginForm'
import { MyCalendar } from './components/MyCalendar'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <div className="App">
      <UserContext.Provider value={{ token, setToken }}>
        {token === null ? <LoginForm /> : <MyCalendar />}
      </UserContext.Provider>
    </div>
  )
}

export default App
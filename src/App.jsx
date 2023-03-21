import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import UserContext from './contexts/userContext'
import { LoginForm } from './components/LoginForm'
import { MyCalendar } from './components/MyCalendar'
import FilterContext from './contexts/FilterContext'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [filtered, setFiltered] = useState('')

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <FilterContext.Provider value={{ filtered, setFiltered }}>
        {token === null ?
          <div className='loginContainer'>
            <LoginForm />
          </div> :
          <MyCalendar />
        }
        <ToastContainer position='bottom-left' />
      </FilterContext.Provider>
    </UserContext.Provider>
  )
}

export default App
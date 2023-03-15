import { useEffect, useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import './App.css'

function App() {

  const API = import.meta.env.VITE_APP_API

  const [token, setToken] = useState('')
  const [portfolio, setPortfolio] = useState([])
  const [operations, setOperations] = useState([])
  const [date, setDate] = useState([])
  const [calendarData, setCalendarData] = useState([])

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate)
    fetch(API + '/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: import.meta.env.VITE_APP_USERNAME,
        password: import.meta.env.VITE_APP_PASSWORD,
        grant_type: 'password'
      })
    })
      .then(res => res.json())
      .then(data => setToken(data.access_token))
  }, [])

  const getPortfolio = async () => {
    const res = await fetch(API + '/api/v2/portafolio/argentina', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    const { activos } = data
    return activos.filter(item => item.titulo.tipo === 'CEDEARS' || item.titulo.tipo === 'ACCIONES')
  }

  const getOperations = async () => {
    const res = await fetch(API + '/api/v2/operaciones?filtro.fechaDesde=2020-01-01', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data.filter(item => item.estado === 'terminada')
  }

  useEffect(() => {
    if (token.length > 0) {
      Promise.all([getPortfolio(), getOperations()])
        .then(res => {
          setPortfolio(res[0])
          setOperations(res[1])
        })
    }
  }, [token])

  useEffect(() => {
    setCalendarData(operations.filter(op => portfolio.map(p => p.titulo.simbolo).includes(op.simbolo))
      .map(op => {
        return {
          value: op.montoOperado,
          day: op.fechaOperada.split('T')[0],
          cantidad: op.cantidadOperada,
          precio: op.precioOperado,
          simbolo: op.simbolo,
          tipo: op.tipo
        }
      }))
  }, [portfolio, operations])

  const customTooltip = ({ day }) => {
    return (
      <div className='tooltip'>
        <h3>{day}</h3>
        <ul>
          {calendarData
            .filter(item => item.day === day)
            .map((cd, idx) => {
              return (
                <li key={idx}>
                  <h4>{cd.simbolo}</h4>
                  <p>Monto: {cd.value}</p>
                  <p>Cantidad: {cd.cantidad}</p>
                  <p>Precio: {cd.precio}</p>
                  <p>Tipo: {cd.tipo}</p>
                </li>
              )
            })}
        </ul>
      </div>
    )
  }

  return (
    <div className="App">
      <ResponsiveCalendar
        data={calendarData}
        tooltip={customTooltip}
        from="2021-01-01"
        to={date}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
    </div>
  )
}

export default App

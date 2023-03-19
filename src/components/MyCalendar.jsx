import { useContext, useEffect, useState } from "react"
import { ResponsiveCalendar } from "@nivo/calendar"
import { useData } from "../hooks/useData"
import UserContext from "../contexts/userContext"
import { Info } from "./Info"
import FilterContext from "../contexts/FilterContext"

export function MyCalendar() {

    const { token } = useContext(UserContext)
    const { filtered } = useContext(FilterContext)
    const { data: { portfolio, operations }, getData } = useData()

    const [date, setDate] = useState([])
    const [calendarData, setCalendarData] = useState([])
    const [fromDate, setDateFrom] = useState("2021-01-01")

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate)
        getData(token)
    }, [])

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
        <div className="container">
            <div className="calendar">
                <ResponsiveCalendar
                    data={filtered.length === 0 ? calendarData : calendarData.filter(item => item.simbolo === filtered)}
                    tooltip={customTooltip}
                    from={fromDate}
                    to={date}
                    emptyColor="#eeeeee"
                    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#fff"
                    monthSpacing={15}
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
            <Info
                portfolio={portfolio}
                operations={operations}
                setDateFrom={setDateFrom}
            />
        </div>
    )
}
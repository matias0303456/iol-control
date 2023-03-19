import { useState } from "react";

export function useData() {

    const API = import.meta.env.VITE_APP_API

    const [data, setData] = useState({
        portfolio: [],
        operations: []
    })

    const getPortfolio = async token => {
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

    const getOperations = async token => {
        const res = await fetch(API + '/api/v2/operaciones?filtro.fechaDesde=2020-01-01', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data.filter(item => item.estado === 'terminada')
    }

    const getData = token => {
        Promise.all([getPortfolio(token), getOperations(token)])
            .then(res => {
                setData({
                    ...data,
                    portfolio: res[0],
                    operations: res[1]
                })
            })
    }


    return { data, getData }

}
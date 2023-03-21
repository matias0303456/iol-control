import { useContext, useState } from "react"
import FilterContext from "../contexts/FilterContext"
import { useInfo } from "../hooks/useInfo"
import { handleRefresh } from "../utils/handleRefresh"

export function Info({ portfolio, operations, setDateFrom }) {

    const { setFiltered } = useContext(FilterContext)

    const { getTPC, getRealProfit } = useInfo()

    const [inflation, setInflation] = useState(0)

    return (
        <div className="info">
            <div className="controls">
                <button
                    id="logout-btn"
                    type="button"
                    className="btn"
                    onClick={() => handleRefresh()}
                >
                    Salir
                </button>
            </div>
            <div className="controls">
                <label>Ticker</label>
                <select onChange={(e) => setFiltered(e.target.value)}>
                    <option value="">Seleccione</option>
                    {portfolio.map((p, idx) => {
                        return <option key={idx} value={p.titulo.simbolo}>{p.titulo.simbolo}</option>
                    })}
                </select>
            </div>
            <div className="controls">
                <label>Graficar desde</label>
                <input type="date" onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div className="controls">
                <label>Ingrese inflación mensual estimada</label>
                <input type="number" step="0.01" onChange={e => setInflation(e.target.value)} /> %
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Símbolo</th>
                        <th>Cant.</th>
                        <th>PPC</th>
                        <th>Últ. precio</th>
                        <th>Rend.</th>
                        <th>TPC</th>
                        <th>Rend. real</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolio.sort((a, b) => {
                        if (a.titulo.tipo > b.titulo.tipo) return 1
                        if (a.titulo.tipo < b.titulo.tipo) return -1
                        return 0
                    }).map(p => {
                        const tpc = getTPC(operations.filter(op => op.simbolo === p.titulo.simbolo))
                        return (
                            <tr>
                                <td>{p.titulo.tipo.slice(0, 3)}</td>
                                <td>{p.titulo.simbolo}</td>
                                <td>{p.cantidad}</td>
                                <td>$ {p.ppc}</td>
                                <td>$ {p.ultimoPrecio}</td>
                                <td>{p.gananciaPorcentaje} %</td>
                                <td>{tpc}</td>
                                <td>{getRealProfit(tpc, p.gananciaPorcentaje, inflation)} %</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
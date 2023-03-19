import { useContext } from "react"
import FilterContext from "../contexts/FilterContext"
import { useInfo } from "../hooks/useInfo"

export function Info({ portfolio, operations, setDateFrom }) {

    const { setFiltered } = useContext(FilterContext)

    const {getTPC} = useInfo()

    return (
        <div className="info">
            <label>Ticker</label>
            <select onChange={(e) => setFiltered(e.target.value)}>
                <option value="">Seleccione</option>
                {portfolio.map((p, idx) => {
                    return <option key={idx} value={p.titulo.simbolo}>{p.titulo.simbolo}</option>
                })}
            </select>
            <div>
                <label>Graficar desde</label>
                <input type="date" onChange={e => setDateFrom(e.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Símbolo</th>
                        <th>Cantidad</th>
                        <th>PPC</th>
                        <th>Ult. precio</th>
                        <th>Rend. %</th>
                        <th>TPC</th>
                        <th>Rend. real %</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolio.sort((a, b) => {
                        if (a.titulo.tipo > b.titulo.tipo) return 1
                        if (a.titulo.tipo < b.titulo.tipo) return -1
                        return 0
                    }).map(p => {
                        return (
                            <tr>
                                <td>{p.titulo.tipo}</td>
                                <td>{p.titulo.simbolo}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.ppc}</td>
                                <td>{p.ultimoPrecio}</td>
                                <td>{p.gananciaPorcentaje}</td>
                                <td>{getTPC(operations.filter(op => op.simbolo === p.titulo.simbolo))}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
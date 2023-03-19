export function useInfo() {

    const getTPC = (operations) => {

        const currentDate = new Date();

        let accCompra = 0
        let accVenta = 0

        const milliseconds = operations.reduce((acc, curr) => {
            const pastDate = new Date(curr.fechaOperada);
            const differenceInMilliseconds = currentDate.getTime() - pastDate.getTime();
            if (curr.tipo === 'Compra') accCompra = accCompra + curr.cantidadOperada
            if (curr.tipo === 'Venta') accVenta = accVenta + curr.cantidadOperada
            if (accCompra === accVenta) {
                acc = 0
                accCompra = 0
                accVenta = 0
            } 
            return acc + differenceInMilliseconds
        }, 0)

        const days = milliseconds / (1000 * 60 * 60 * 24)
        const result = days / operations.filter(op => op.tipo === 'Compra').reduce((acc, curr) => {
            return acc + curr.cantidadOperada
        }, 0)

        return `${parseInt(result)} días`

    }

    return { getTPC }

}
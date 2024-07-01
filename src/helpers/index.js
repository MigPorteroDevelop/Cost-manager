export const formatQuantity = (quantity) => {
    return Number(quantity).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}
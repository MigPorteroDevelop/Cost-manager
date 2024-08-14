export const formatQuantity = (quantity) => {
    return Number(quantity).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

export const idGenerate = () => {
    const random = Math.random().toString(36).substring(2);
    return random
}
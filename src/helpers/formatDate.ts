
const getDate = (): string => {
	const date = new Date();

    const year = fillZeroDate(date.getFullYear())
    const month = fillZeroDate(date.getMonth() + 1)
    const day = fillZeroDate(date.getDate())

	return `${year}${month}${day}`
}


const fillZeroDate = (date: number, fillQuantity: number = 2): string => {
    if (date < 10) return date.toString().padStart(fillQuantity, "0")
    return String(date)
}



export { getDate }

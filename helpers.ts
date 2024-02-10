export interface Order {
	id: string
	OrderNumber: string
	telephone: string
	price: number
	date: string
	deliveryMethod: string
	title: string
}

export const headers = [
	'id',
	'OrderNumber',
	'telephone',
	'price',
	'date',
	'deliveryMethod',
	'title',
]

export const getAverageSum = (orders: Order[]) => {
	const russianOrders = orders.filter(
		order =>
			order.telephone.startsWith('+7') && order.deliveryMethod === 'pickup'
	)

	const sum = russianOrders.reduce((total, order) => total + order.price, 0)

	return sum / russianOrders.length
}

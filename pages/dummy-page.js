import { useEffect, useState } from 'react'
import useSWR from 'swr'

const DummyPage = () => {
	const [sales, setSales] = useState()
	// const [loading, setLoading] = useState(false)

	const { data, error } = useSWR(
		'https://nextjs-datafetching-5c813-default-rtdb.firebaseio.com/sales.json'
	)
	useEffect(() => {
		if (data) {
			const transformedSales = []
			for (const key in data) {
				transformedSales.push({
					id: key,
					username: data[key].username,
					quantity: data[key].quantity,
				})
			}
			setSales(transformedSales)
		}
	}, [data])
	// useEffect(() => {
	// 	setLoading(true)
	// 	fetch(
	// 		'https://nextjs-datafetching-5c813-default-rtdb.firebaseio.com/sales.json'
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setLoading(false)
	// 		})
	// }, [])
	if (error) {
		return <p>Failed To Load</p>
	}
	if (!data || !sales) {
		return <p>Loading..</p>
	}
	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username}-${sale.quantity}
				</li>
			))}
		</ul>
	)
}

export default DummyPage

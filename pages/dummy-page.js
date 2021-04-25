import { useEffect, useState } from 'react'

const DummyPage = () => {
	const [sales, setSales] = useState()
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		fetch(
			'https://nextjs-datafetching-5c813-default-rtdb.firebaseio.com/sales.json'
		)
			.then((response) => response.json())
			.then((data) => {
				const transformedSales = []
				for (const key in data) {
					transformedSales.push({
						id: key,
						username: data[key].username,
						quantity: data[key].quantity,
					})
				}
				setSales(transformedSales)
				setLoading(false)
			})
	}, [])
	if (loading) {
		return <p>Loading..</p>
    }
    if (!sales) {
        return <p>No data Yet</p>
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

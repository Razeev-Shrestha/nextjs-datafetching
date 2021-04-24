import { Fragment } from 'react'
import fs from 'fs/promises'
import path from 'path'

const ProductDetailPage = ({ loadedProduct }) => {
	// if (!loadedProduct) {
	// 	return <p>Loading...</p>
	// }
	return (
		<Fragment>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</Fragment>
	)
}

async function getData() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
	const jsonData = await fs.readFile(filePath)
	const data = JSON.parse(jsonData)
	return data
}

export async function getStaticProps({ params }) {
	const productId = params.pid
	const data = await getData()

	const product = data.products.find((product) => product.id === productId)
	return {
		props: {
			loadedProduct: product,
		},
	}
}

export async function getStaticPaths() {
	const data = await getData()
	const ids = data.products.map((product) => product.id)
	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))

	return {
		paths: pathsWithParams,
		fallback: false,
	}
}

export default ProductDetailPage
import express, { response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import csv from 'csvtojson'
import morgan from 'morgan'
import { Order, getAverageSum, headers } from './helpers'

dotenv.config()

const user = process.env.USER
const password = process.env.PASSWORD
const url = process.env.URL || ''
const port = process.env.PORT || 8000

const app = express()

const options = {
	headers: {
		Authorization: `Basic ${Buffer.from(user + ':' + password).toString(
			'base64'
		)}`
	}
}

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const converter = csv({
	checkType: true,
	headers: headers
})

app.get('/', (req, res) => {
	axios
		.get(url, options)
		.then((response) => {
			const postData = converter
				.fromString(response.data)
				.then((jsonArray: Order[]) => ({
					average: getAverageSum(jsonArray)
				}))
			return axios.post(`${url}/result/`, postData, options)
		})
		.then(() => res.send('Success!'))
		.catch((error) => {
			res.send(error)
		})
})

app.listen(port, () => {
	console.log(
		`Server is 🚀 at http://localhost:${port} in ${process.env.NODE_ENV} mode`
	)
})

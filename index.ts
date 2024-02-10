import express from 'express'
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
		)}`,
	},
}

const converter = csv({
	checkType: true,
	headers: headers,
})

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.get('/', (req, res) => {
	axios
		.get(url, options)
		.then(response => {
			converter.fromString(response.data).then((jsonArray: Order[]) => {
				const postData = {
					average: (getAverageSum(jsonArray) / 100)
						.toFixed(2)
						.replace('.', ','),
				}

				axios
					.post(`${url}/result/`, postData, options)
					.then(_response => res.send(postData))
					.catch(error => res.send(error))
			})
		})
		.catch(error => {
			res.send(error)
		})
})

app.listen(port, () => {
	console.log(
		`Server is 🚀 at http://localhost:${port} in ${process.env.NODE_ENV} mode`
	)
})

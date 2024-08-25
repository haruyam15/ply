import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'
const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL

const sampleDBName = 'hansarang3club'
let database

async function connectToDB() {
	try {
		const client = await MongoClient.connect(MONGOURL)
		database = client.db(sampleDBName)
		app.listen(PORT, () => console.log(`MongoDB listening on ${PORT}`))
	} catch (error) {
		res.status(500).send(error)
	}
}
connectToDB()

app.get('/api/information', async (req, res) => {
	try {
		const information = await database.collection('information').find({}).toArray()
		res.send(information)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/api/users', async (req, res) => {
	try {
		const users = await database.collection('users').find({}).toArray()
		res.send(users)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/api/playListData', async (req, res) => {
	try {
		const playListData = await database.collection('playListData').find({}).toArray()
		res.send(playListData)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/api/comments', async (req, res) => {
	try {
		const comments = await database.collection('comments').find({}).toArray()
		res.send(comments)
	} catch (error) {
		res.status(500).send(error)
	}
})

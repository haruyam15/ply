import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'
const app = express()

app.use(cors())
app.use(bodyParser.json())
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL

const sampleDBName = 'sample_mflix'
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

app.get('/api/users', async (req, res) => {
  try {
    const users = await database.collection('users').find({}).toArray()
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

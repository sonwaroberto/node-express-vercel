//require module
import express from 'express'
import cors from 'cors'
import logger from './logger'
import connect from './db/connect'
import routes from './routes/routes'
//require environment file
import 'dotenv/config'

const app = express()

//setting port
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//To allow cross-origin requests
app.use(cors())

//Route Prefixes
app.use('/api', routes)

//check if server is running and load the connect to db function
app.listen(port, () => {
  logger.info('server started on port 5000')
  connect()
})

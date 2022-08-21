import mongoose from 'mongoose'
import 'dotenv/config'
import log from '../logger'

//DB connection
const connect = () => {
  const dbUri = process.env.DB_CONNECTION as string
  return mongoose
    .connect(dbUri)
    .then((client) => {
      log.info(
        `Connected to Mongo! Database name: "${client.connections[0].name}"`
      )
    })
    .catch((error) => {
      log.error('db error', error)
      process.exit(1)
    })
}

export default connect

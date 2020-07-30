import { config } from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const envFound = config()
if (envFound.error) {
  throw new Error('⚠️ Arquivo .env não encontrado! ⚠️')
}

const { PORT, HOST, PROTOCOL, MONGODB_URI, API_KEY } = process.env

export default {
  PORT,
  HOST,
  PROTOCOL,
  MONGODB_URI,
  API_KEY
}

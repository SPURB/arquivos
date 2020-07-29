import { config } from 'dotenv'
import { app, basePath } from './app'

config()

const { PORT = 5000, HOST = 'localhost', PROTOCOL = 'http' } = process.env
app.listen(PORT, () =>
  console.log(`Serviço disponível em ${PROTOCOL}://${HOST}:${PORT}${basePath}`)
)

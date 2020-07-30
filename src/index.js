import config from './config'
import { app, basePath } from './app'

const { PORT, HOST, PROTOCOL } = config
app.listen(PORT, () =>
  console.log(`Serviço disponível em ${PROTOCOL}://${HOST}:${PORT}${basePath}`)
)

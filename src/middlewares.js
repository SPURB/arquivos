import config from './config'
const { version } = require('../package.json')
import multer from 'multer'

export default {
  /*
   * Authorization: API Key
   */
  isAuth: (req, res, next) => {
    const { authorization } = req.headers
    const isAuthorized = config.API_KEY === authorization
    isAuthorized ? next() : res.status(403).json({ message: 'Não Autorizado' })
  },
  // Versionamento
  addVersion: (req, res, next) => {
    res.header('Version', version)
    next()
  }
}

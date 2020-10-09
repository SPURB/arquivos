import { Router } from 'express'
import { Types } from 'mongoose'
import Arquivo from './models/arquivos'
import middlewares from './middlewares'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().valueOf()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const route = Router()

route.get('/', (req, res) => {
  Arquivo.find()
    .select('_id file')
    .exec()
    .then(docs => {
      const response = {
        items: docs.length,
        message: 'Lista de arquivos',
        arquivos: docs
      }
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

route.get('/:idArquivo', (req, res) => {
  const id = req.params.idArquivo
  Arquivo.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: 'Arquivo não encontrado'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

route.post(
  '/',
  middlewares.isAuth,
  upload.single('arquivo'),
  (req, res, next) => {
    const createdAt = new Date()
    const arquivo = new Arquivo({
      _id: new Types.ObjectId(),
      metadados: req.body.metadados,
      updateAt: createdAt,
      createdAt,
      file: req.file
    })
    arquivo
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Arquivo cadastrado',
          result
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
)

route.patch('/:idArquivo', middlewares.isAuth, (req, res) => {
  const _id = req.params.idArquivo
  const updateOptions = {}

  for (const ops of req.body) {
    updateOptions[ops.prop] = ops.value
  }
  Arquivo.update(
    { _id },
    {
      $set: updateOptions,
      updateAt: new Date()
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

route.delete('/:idArquivo', middlewares.isAuth, (req, res) => {
  const _id = req.params.idArquivo
  Arquivo.remove({ _id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

export default route
